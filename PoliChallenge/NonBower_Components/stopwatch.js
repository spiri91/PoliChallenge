function clsStopwatch() {
    // Private vars
    var startAt = 0;	// Time of last start / resume. (0 if not running)
    var lapTime = 0;	// Time on the clock when last stopped in milliseconds
    var $time;
    var clocktimer;

    var now = function () {
        return (new Date()).getTime();
    };

    // Public methods
    // Start or resume
    var start = function (elementId) {
        $time = document.getElementById(elementId);
        startAt = startAt ? startAt : now();
    };

    // Stop or pause
    var stop = function () {
        // If running, update elapsed time otherwise keep it
        lapTime = startAt ? lapTime + now() - startAt : lapTime;
        startAt = 0; // Paused
    };

    // Reset
    var reset = function () {
        lapTime = startAt = 0;
    };

    // Duration
    var time = function () {
        return lapTime + (startAt ? now() - startAt : 0);
    };

    function pad(num, size) {
        var s = "0000" + num;
        return s.substr(s.length - size);
    }

    function formatTime(time) {
        var h = m = s = ms = 0;
        var newTime = '';

        h = Math.floor(time / (60 * 60 * 1000));
        time = time % (60 * 60 * 1000);
        m = Math.floor(time / (60 * 1000));
        time = time % (60 * 1000);
        s = Math.floor(time / 1000);
        ms = time % 1000;

        newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
        return newTime;
    }

    function show() {
        update();
    }

    function update() {
        $time.innerHTML = formatTime(x.time());
    }

    function start() {
        clocktimer = setInterval("update()", 1);
        x.start();
    }

    function stop() {
        x.stop();
        clearInterval(clocktimer);
    }

    function reset() {
        stop();
        x.reset();
        update();
    }

    return {
        start: start,
        stop: stop,
        reset: reset
    }
}