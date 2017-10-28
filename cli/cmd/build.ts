import * as fs from 'fs-extra';
import * as path from 'path';
import {Command, ActionCallback} from "../cli";
import * as C from "../const";
import {existsConfigFile, createFolder} from "../utils";
import {parseConfig, Config, generateKhafileContent, platform, getConfigFile, ConfigHTML5} from "../config";
import {exec, execSync} from 'child_process';
import {series, eachSeries} from 'async';
import * as colors from 'colors';

const usage = `compile the current project
          ${C.ENGINE_NAME} build [ target ] [ -c config ]
          
          where [ target ] can be some platform as 'html5' or 'osx',
          and where [ -c config ] can be the prefix of a config file.
          For example: 'dev' to use 'dev.${C.ENGINE_NAME}.toml' 
          or 'prod' to use 'prod.${C.ENGINE_NAME}.toml'.
          
          By default will compile all the targets in 'dev.${C.ENGINE_NAME}.toml'`;

export const cmd:Command = {
    name: "build",
    alias: ["-b", "--build"],
    usage: usage,
    action: _action
}

interface buildParseArgs {
    err?:string
    args:string[]
    target:string
    config:string
}

function _parseArgs(args:string[]) : buildParseArgs {
    let parsed:buildParseArgs = {
        err:"",
        args: args,
        target: "",
        config: ""
    };

    if(!args.length){
        return parsed;
    }

    let platformList = Object.keys(platform);
    if(args[0][0] !== "-"){
        let target = args.shift();
        let valid = false;
        for(let i = 0; i < platformList.length; i++) {
            let t = platform[platformList[i]];
            if(t === target){
                valid = true;
                parsed.target = t;
                break;
            }
        }

        if(!valid){
            parsed.err = `Invalid target '${target}'.`;
            return parsed;
        }
    }

    if(args.length >= 2 && args[0][0] === "-" && args[0] === "-c"){
        args.shift(); //discard -c
        let file = args.shift();
        if(file[0] === "-"){
            parsed.err = `Invalid config '-c ${file}'.`;
            return parsed;
        }

        parsed.config = file;
    }

    parsed.args = args;
    return parsed;
}

function _action(args:string[], cb:ActionCallback) {
    if(!existsConfigFile()){
        cb(new Error(`Invalid ${C.ENGINE_NAME} project. Config file not found.`));
        return;
    }

    const parsed = _parseArgs(args);
    if(parsed.err){
        cb(new Error(parsed.err));
        return;
    }

    args = parsed.args;

    const file = getConfigFile(parsed.config);
    if(!file){
        cb(new Error("Not found any config file."));
        return;
    }

    const config = parseConfig(file);
    if(!config){
        cb(new Error("Invalid config file"));
        return;
    }

    if(parsed.target){
        if(!config[parsed.target]){
            cb(new Error(`Target ${parsed.target} not defined in the config file.`));
            return;
        }

        if(config[parsed.target].disable){
            cb(new Error(`Target ${parsed.target} is disabled in the config file.`));
            return;
        }
    }

    let platformList = Object.keys(platform);
    let err = _generateKhafile(config);
    if(err){
        cb(err);
        return;
    }

    let kmakeBasic:KhaMakeConfig = {
        target: "",
        projectfile: path.join(C.TEMP_RELATIVE_PATH, "khafile.js"),
        to: C.TEMP_BUILD_PATH,
        kha: config.core.kha,
        haxe: config.core.haxe,
        build: path.resolve(C.CURRENT_PATH, config.output),
        debug: !!config.debug,
    };

    let existsTarget = false;
    for(let i = 0; i < platformList.length; i++){
        let target = platform[platformList[i]];
        if(config[target] && !config[target].disable) {
            existsTarget = true;
            break;
        }
    }

    if(!existsTarget){
        cb(new Error("No one platform it's defined as target in the config file."));
        return;
    }

    let list = parsed.target ? [_getPlatformByValue(parsed.target)] : platformList;

    eachSeries(list, (key, next)=>{
        
        let target = platform[key];
        if(!config[target] || config[target].disable){
            next();
            return;
        }

        let kmake = JSON.parse(JSON.stringify(kmakeBasic));
        kmake.target = target;
        if(target === platform.OSX || target === platform.Win) {
            if(config[target].graphics){
                kmake.graphics = config[target].graphics;
            }
        }

        if(target === platform.HTML5){
            kmake.html5 = config.html5;
        }

        _runKhaMake(kmake, next);

    }, (err)=>{
        if(err){
            cb(err);
            return;
        }

        if(config.core.clean_temp){
            let err = _cleanTempFolder();
            if(err){
                cb(err);
                return;
            }
        }

        console.log(colors.bold(colors.green("Done.")));
        cb(null, args);
    });
}

function _getPlatformByValue(v:string) : string {
    let key = "";
    for(var k in platform){
        if(platform[k] === v){
            key = k;
            break;
        }
    }
    return key;
}

function _generateKhafile(config:Config) : Error {
    let err = createFolder(C.TEMP_PATH);
    if(err){
        return err;
    }

    try {
        fs.writeFileSync(path.join(C.TEMP_PATH, "khafile.js"), generateKhafileContent(config), {encoding: "UTF-8"});        
    } catch(e){
        err = e
    }

    return err
}

interface KhaMakeConfig {
    target:string
    projectfile:string
    kha:string
    haxe:string
    to:string
    build:string
    debug:boolean
    html5?:ConfigHTML5
    graphics?:string
}

async function _runKhaMake(config:KhaMakeConfig, cb) {
    console.log(colors.cyan(`Compiling ${config.target}...`));

    let cmd = `${C.KHA_MAKE_PATH} ${config.target} --compile`;
    
    if(config.graphics){
        cmd += ` -g ${config.graphics}`;
    }

    cmd += ` --projectfile ${config.projectfile}`;
    cmd += ` --to ${config.to}`;
    
    if(config.debug){
        cmd += ` --debug`; 
    }

    //todo export to osx -> gamename_version_$mode ?
    
    console.log(colors.yellow(" - - - - "));
    let k = exec(cmd, {maxBuffer: 1024 * 1024 * 15}, (err:Error, stdout:string, stderr:string)=>{
        console.log(colors.yellow(" - - - - \n"));

        if(stderr){
            cb(new Error(`Error: ${stderr}`));
            return;
        }

        if(err){
            cb(err);
            return;
        }

        err = createFolder(C.TEMP_PATH);
        if(err){
            cb(err);
            return;
        }

        err = _moveBuild(config.target, config.build, config.debug, config.html5);
        if(err){
            cb(err);
            return;
        }

        cb();
    });

    //k.stdout.on('data', d => console.log(d.toString()));
    k.stdout.pipe(process.stdout);
}

const releaseDestination = {
    html5: "html5",
    osx: "osx-build/build/$mode"
};

function _moveBuild(target:string, to:string, debug:boolean, html5?:ConfigHTML5) : Error {
    let err:Error;
    let buildPath = releaseDestination[target].replace("$mode", debug ? "Debug" : "Release");
    let _from = path.join(C.TEMP_BUILD_PATH, buildPath);
    let _to = path.join(to, target);

    switch(target) {
        case platform.HTML5:
            err = _moveHTML5Build(_from, _to, debug, html5);
            break;
        default:
            _to = path.join(_to, debug ? "debug" : "release");
            err = _copy(_from, _to);
            break;
    }

    return err
}

function _moveHTML5Build(from:string, to:string, debug:boolean, html5:ConfigHTML5) : Error {
    //todo uglify html5 in !debug mode
    //todo if exists a custom html file copy and replace vars
    let err:Error;

    let scriptName = html5.script;
    if(debug){
        err = _copy(path.join(from, `${scriptName}.js`), path.join(to, `${scriptName}.js`));
        if(err){
            return err;
        }

        err = _copy(path.join(from, `${scriptName}.js.map`), path.join(to, `${scriptName}.js.map`));
        if(err){
            return err;
        }
    }else{
        if(html5.uglify){
            let file:string;
            try {
                file = fs.readFileSync(path.join(from, `${scriptName}.js`), {encoding: "UTF-8"});
            }catch(e){
                return e;
            }

            let min:string;
            try {
                console.log(colors.cyan("Minifying javascript..."));
                min = execSync(`node ${C.ENGINE_PATH}/node_modules/uglify-js/bin/uglifyjs ${path.join(from, `${scriptName}.js`)} --compress --mangle`, {encoding: "UTF-8"}) as any;
            }catch(e){
                return e;
            }

            try {
                fs.ensureDirSync(to);
                fs.writeFileSync(path.join(to, `${scriptName}.js`), min, {encoding: "UTF-8", flags: "w"});
            }catch(e){
                return e;
            }

        }else{
            err = _copy(path.join(from, `${scriptName}.js`), path.join(to, `${scriptName}.js`));
            if(err){
                return err;
            }
        }
    }

    if(html5.html_file){
        let file:string;
        try {
            file = fs.readFileSync(path.resolve(C.CURRENT_PATH, html5.html_file), {encoding: "UTF-8"});
        }catch(e){
            return e;
        }

        //TODO parse file with html5 vars

        try {
            fs.writeFileSync(path.join(to, `index.html`), file, {encoding: "UTF-8"});
        }catch(e){
            return e;
        }

    }else{
        err = _copy(path.join(from, `index.html`), path.join(to, `index.html`));
        if(err){
            return err;
        }
    }

    return err;
}

function _copy(from:string, to:string) : Error {
    //console.log(colors.cyan(`Moving build '${from} to ${to}`));
    let err:Error;
    try {
        fs.copySync(from, to);
    }catch(e){
        err = e
    }
    return err;
}

function _cleanTempFolder() : Error {
    console.log(colors.cyan("Cleaning temporal files..."));
    let err:Error;
    try {
        fs.removeSync(C.TEMP_PATH);
    }catch(e){
        err = e
    }
    return err;
}