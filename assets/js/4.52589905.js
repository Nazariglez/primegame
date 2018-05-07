(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{60:function(e,t,r){"use strict";r.r(t);var o=r(0),a=Object(o.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"content"},[r("h1",{attrs:{id:"getting-started"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#getting-started","aria-hidden":"true"}},[e._v("#")]),e._v(" Getting Started")]),r("p",[e._v("To use "),r("strong",[e._v("Gecko2D")]),e._v(" you need "),r("a",{attrs:{href:"https://git-scm.com/downloads",target:"_blank",rel:"noopener noreferrer"}},[e._v("Git")]),e._v(" and "),r("a",{attrs:{href:"https://nodejs.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Node.js")]),e._v(" 9.x.x or higher.")]),r("h2",{attrs:{id:"installation"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#installation","aria-hidden":"true"}},[e._v("#")]),e._v(" Installation")]),r("p",[e._v("Just install it via npm:")]),r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("npm install gecko2d -g\n")])]),r("p",[e._v("You can test it typing in your terminal "),r("code",[e._v("gecko init -t flappy watch")]),e._v(" and going to "),r("a",{attrs:{href:"http://localhost:8080",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://localhost:8080")]),e._v(" to play a flappy bird clone.")]),r("h2",{attrs:{id:"first-steps"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#first-steps","aria-hidden":"true"}},[e._v("#")]),e._v(" First Steps")]),r("h3",{attrs:{id:"initialize"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#initialize","aria-hidden":"true"}},[e._v("#")]),e._v(" Initialize")]),r("p",[e._v("You can start a new project typing in your terminal "),r("code",[e._v("gecko init")]),e._v(" on an empty folder or "),r("code",[e._v("gecko init -t empty")]),e._v(", this will clone the structure from the "),r("a",{attrs:{href:"https://github.com/Nazariglez/Gecko2D/tree/master/templates",target:"_blank",rel:"noopener noreferrer"}},[e._v("template basic or empty")]),e._v(", and create the config file "),r("code",[e._v("dev.gecko.toml")]),e._v(".")]),r("h3",{attrs:{id:"project-structure"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#project-structure","aria-hidden":"true"}},[e._v("#")]),e._v(" Project structure")]),r("p",[e._v("Every project has this structure by default:")]),r("ul",[r("li",[r("strong",[e._v("Assets:")]),e._v(" A directory to add the game images, sounds, etc...")]),r("li",[r("strong",[e._v("Libraries:")]),e._v(" Plugins goes here.")]),r("li",[r("strong",[e._v("Sources:")]),e._v(" Where the magic happends, the source code of your game.")]),r("li",[r("strong",[e._v("dev.gecko.toml:")]),e._v(" This is the project's config file, read more on "),r("a",{attrs:{href:"#config-file"}},[e._v("his section")]),e._v(".")]),r("li",[r("strong",[e._v("khafile.js:")]),e._v(" Kha's config, this file is autogenerated and (normally) you don't need to change it.")])]),r("h3",{attrs:{id:"build-and-serve"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#build-and-serve","aria-hidden":"true"}},[e._v("#")]),e._v(" Build and serve")]),r("p",[e._v("To build the game use "),r("code",[e._v("gecko build")]),e._v(". By default the build command will create a html5 bundle, you can serve it on "),r("a",{attrs:{href:"http://localhost:8080",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://localhost:8080")]),e._v(" using "),r("code",[e._v("gecko serve")]),e._v(". To build and serve automatically when some source change use "),r("code",[e._v("gecko watch")]),e._v(".")]),r("h2",{attrs:{id:"command-line-interface"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#command-line-interface","aria-hidden":"true"}},[e._v("#")]),e._v(" Command Line Interface")]),r("p",[e._v("Gecko has a command line interface to make your life easy.")]),r("ul",[r("li",[r("strong",[e._v("gecko init [ -t template ]:")]),e._v(" initialize a new project.")]),r("li",[r("strong",[e._v("gecko build [ target ] [ -c config ]:")]),e._v(" compile the current project.")]),r("li",[r("strong",[e._v("gecko watch [ -c config ]:")]),e._v(" watch the project and serve the changes.")]),r("li",[r("strong",[e._v("gecko serve [ -c config ]:")]),e._v(" serve the html5 build.")]),r("li",[r("strong",[e._v("gecko dir [ -kha ]:")]),e._v(" print the directory where gecko (or kha) is intalled.")]),r("li",[r("strong",[e._v("gecko khafile [ -c config ]:")]),e._v(" generate the khafile.js using the config file.")]),r("li",[r("strong",[e._v("gecko docs:")]),e._v(" serve the documentation at 8081")])]),r("p",[e._v("Type "),r("code",[e._v("gecko help")]),e._v(" in your terminal for more information.")]),r("h2",{attrs:{id:"ides"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#ides","aria-hidden":"true"}},[e._v("#")]),e._v(" IDEs")]),r("p",[e._v("You can use any IDE with support for "),r("strong",[e._v("haxe")]),e._v(", but, in this guide we'll cover "),r("strong",[e._v("Kode Studio")]),e._v(".")]),r("h3",{attrs:{id:"kode-studio"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kode-studio","aria-hidden":"true"}},[e._v("#")]),e._v(" Kode Studio")]),r("p",[r("a",{attrs:{href:"https://github.com/Kode/KodeStudio/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kode Studio")]),e._v(" is a fork of "),r("a",{attrs:{href:"https://code.visualstudio.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Visual Studio Code")]),e._v(" with everything you will need to work in a "),r("a",{attrs:{href:"http://kha.tech/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kha's project")]),e._v(", as haxe support, intellisense and debugging features.")]),r("p",[e._v("If it's good for Kha, it's good for Gecko2D. Kode Studio needs a config file named khafile.js, this file is generated by default when a new gecko's project is initiated, you just need to open your project with Kode Studio and work on it.")]),r("p",[e._v("Kode Studio includes his own version of Kha, if you want to compile your project using the compilation options of Kode Studio is better use the version of Kha which include gecko, to do that typing in your terminal "),r("code",[e._v("gecko dir -kha")]),e._v(" and copy the returned directory, go to Kode Studio -> Preferences and set "),r("code",[e._v("kha.khaPath")]),e._v(" with the directory copied.")]),r("p",[e._v("Check the "),r("strong",[e._v("start")]),e._v(" and "),r("strong",[e._v("build")]),r("a",{attrs:{href:"http://kha.tech/getstarted",target:"_blank",rel:"noopener noreferrer"}},[e._v("section of Kha")]),e._v(" to know more about Kode Studio, and how debug your project with it.")]),r("h2",{attrs:{id:"config-file"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#config-file","aria-hidden":"true"}},[e._v("#")]),e._v(" Config file")]),r("p",[e._v("Every project use a file named "),r("code",[e._v("dev.gecko.toml")]),e._v(" as a config file. This file is used to generate the khafile.js before the compilation.")]),r("p",[e._v("The config file is basically an abstraction of the khafile.js with some extra options. This file defines parameters to compile to differents targets, and how the project is structured.")]),r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('# development gecko config.\nname = "Gecko2D-Game"\nsources = ["Sources"]\nshaders = []                        #shaders directory\nlibraries = []                      #libs at Libraries folder or haxelib\noutput = "build"                    #build output\ndebug = false                        #compile in debug mode\n\n[html5]\nwebgl = true\ncanvas = "kanvas"           #canvas id\nscript = "game"             #script name\nserve_port = 8080           #port to serve the build with gecko serve\nhtml_file = ""              #inject the script in a custom html\n\n[osx]\ngraphics = "opengl"         #mac graphics [opengl | metal]\n\n[windows]\ngraphics = "direct3d11"         #windows graphics [direct3d11 | direct3d9 | direct3d12 | opengl]\n\n[flags]                         #custom compiler flags\n#debug_collisions = true\n\n[core]\nclean_temp = false              #clean temporal files after compile\ncompile = false                 #if false, the game will not be compiled, and the "resources" to compile will stay at the build directory\ncompiler_parameters = []        #haxe compiler parameters (ex: "-dce full")\nffmpeg = ""                     #ffmpeg drivers path (could be absolute)\nhaxe = ""\nkha = ""\n')])]),r("p",[e._v("If your are building your project using Kode Studio, and you change something in your config file, use "),r("code",[e._v("gecko khafile")]),e._v(" to update the project's khafile.js. If you're using "),r("code",[e._v("gecko build [ target ]")]),e._v(" to build the project the khafile.js will be updated automatically.")]),r("h2",{attrs:{id:"building-a-project"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#building-a-project","aria-hidden":"true"}},[e._v("#")]),e._v(" Building a project")]),r("p",[e._v("To build your project, type in your terminal "),r("code",[e._v("gecko build [ target ]")]),e._v(" where target is the platform you want. This is going to create the files to debug or compile the project. If the "),r("code",[e._v("dev.gecko.toml -> core -> compile")]),e._v(" is "),r("code",[e._v("true")]),e._v(", Kha will try to compile your project directly.")]),r("h3",{attrs:{id:"html5"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#html5","aria-hidden":"true"}},[e._v("#")]),e._v(" HTML5")]),r("p",[e._v("This is the easiest platform to build, nothing extra is required, just use "),r("code",[e._v("gecko build")]),e._v(" and the build goes to the path "),r("code",[e._v("build/html5-build")]),e._v(". If "),r("code",[e._v("dev.gecko.toml -> debug")]),e._v(" is "),r("code",[e._v("false")]),e._v(", the javascript bundle will be minificated.")])])}],!1,null,null,null);t.default=a.exports}}]);