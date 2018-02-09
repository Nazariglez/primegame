package exp.systems;

import exp.components.Component;

using Lambda;

@:allow(exp.Scene)
class System implements ISystem {
    public var id:Int = Gecko.getUniqueID();

    public var name(get, set):String;
    private var _name:String = "";

    public var priority:Int = 0;
    public var requiredComponents:Array<String> = [];

    private var _entities:Array<Entity> = [];
    private var _dirtySortEntities:Bool = false;

    public var disableDraw:Bool = true;
    public var disableUpdate:Bool = false;

    public var matcher:Matcher = new Matcher();

    public function new(){}

    public function process(delta:Float32){
        if(_dirtySortEntities){
            _entities.sort(_sortEntities);
            _dirtySortEntities = false;
        }

        update(delta);
    }

    private function _sortEntities(a:Entity, b:Entity) {
        if (a.depth < b.depth) return -1;
        if (a.depth > b.depth) return 1;
        return 0;
    }

    public function update(delta:Float32){}
    public function draw(){}
    public function reset(){}

    public function destroy(avoidPool:Bool = false) {
        reset();
        removeAllEntities();
        matcher.clear();
        if(!avoidPool)__toPool__();
    }

    private function __toPool__(){} //macro

    public inline function getEntities() : Array<Entity> {
        return _entities;
    }

    public inline function getEntitiesWithComponent(componentClass:String) : Array<Entity> {
        return _entities.filter(function(e) {
            return e.hasComponent(componentClass);
        }).array();
    }

    //override to check if an entity is valid for your system
    public function isValidEntity(entity:Entity) : Bool {
        return matcher.testEntity(entity);
    }

    public function removeAllEntities() {
        for(e in _entities){
            _removeEntity(e);
        }
    }

    public inline function hasEntity(entity:Entity) : Bool {
        return _entities.indexOf(entity) != -1;
    }

    private function _registerEntity(entity:Entity) {
        if(isValidEntity(entity)){
            _entities.push(entity);
            entity.onComponentRemoved += _onEntityRemoveComponent;
            _dirtySortEntities = true;
        }
    }

    private function _onEntityRemoveComponent(entity:Entity, component:Component) {
        //if(componentList.indexOf(Type.getClass(component)) != -1){
        if(!isValidEntity(entity)){
            _removeEntity(entity);
        }
    }

    private function _removeEntity(entity:Entity) {
        entity.onComponentRemoved -= _onEntityRemoveComponent;
        _entities.remove(entity);
    }

    private function _removeAllEntities() {
        for(e in _entities){
            _removeEntity(e);
        }
    }

    inline function get_name():String {
        return _name == "" ? __typeName__ : _name;
    }

    inline function set_name(value:String):String {
        return this._name = value;
    }
}