package gecko.utils;


import kha.Scheduler;

class FPSCounter {
    public var delta:Float = 0;
    public var fps:Float = 0;
    public var ms:Float = 0;
    public var timeToMeasure:Float = 1;

    private var _frames:Float = 0;
    private var _elapsed:Float = 0;
    private var _last:Float = 0;

    public var isFixed(default, null):Bool = false;

    public function new(isFixed:Bool = false){
        this.isFixed = isFixed;
        _last = isFixed ? Scheduler.time() : Scheduler.realTime();
    }

    public function tick() {
        var now = isFixed ? Scheduler.time() : Scheduler.realTime();
        _frames++;
        delta = now - _last;
        _elapsed += delta;
        _last = now;

        if(_elapsed >= timeToMeasure){
            fps = Math.round((_frames/_elapsed)*100)/100;
            ms = Math.round((_elapsed/_frames)*1000);
            _frames = 0;
            _elapsed = 0;
        }
    }

    public function clear() {
        _frames = 0;
        _elapsed = 0;
        _last = isFixed ? Scheduler.time() : Scheduler.realTime();
    }
}