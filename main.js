var TW = function() {
    this._status = 0;
    this._frameCount = 0;
    this._sm = {};
    this._options = TW.extend({}, TW.DEFAULT_OPTIONS);
}

/**
 * @description get current timestamp
 * @return {num} current timestamp
 */
TW.gts = function() {
    if (Date.now) {
        return Date.now();
    } else {
        return new Date().getTime();
    }
}

/**
 * @description get type
 * @return {string} varible type
 */
TW.getType = function(unknow) {
    var plainResult = Object.prototype.toString.call(unknow);
    // remove useless part, return
    return plainResult.replace(/\[object (\w+)\]/, "$1");
}

/**
 * @description extend method
 * @return {object} merged object
 */
TW.extend = function(src) {
    var prop, argLen = arguments.length,
        targets, target;
    // if no target to extend from, or src can't be apply a extend
    if (argLen == 1 || typeof src === "undefined") {
        return src;
    }
    targets = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, targLen = targets.length; i < targLen; i++) {
        target = targets[i];
        for (prop in target) {
            src[prop] = target[prop];
        }
    }
    return src;
};

TW.DEFAULT_OPTIONS = {
    runType: "auto", // auto, spec
    interval: 16,
    ease: "linear"
}


TW.ease = {
    linear: function(t) {
        return t;
    }


}

/**
 * @description tansfer width static velocity
 * @param {object} fromObj
 * @param {object} toObj
 * @param {num} time
 * @param {object} option
 * return {object} this
 */
TW.prototype.fromTo = function(fromObj, toObj, time, option) {
    var p;

    // set option in this
    this.setOptions(option);
    this._time = time;
    this._fm = fromObj;
    this._tm = toObj;

    for (p in fromObj) {
        if (fromObj.hasOwnProperty(p) && toObj.hasOwnProperty(p)) {
            this._sm[p] = true;
        }
    }


    return this;
}

/**
 * @description tansfer width static velocity
 * @param {function} cb callback invoked every frame
 * @param {object} hook this object
 */
TW.prototype.run = function(cb, hook) {
    var easeFun, me = this;
    this._frameCount = 0;
    this._status = 2;
    this._startTime = TW.gts();

    if (TW.getType(this._options.ease) === "String") {
        easeFun = TW.ease[this._options.ease];
        if (TW.getType(easeFun) !== "Function") {
            easeFun = TW.ease[TW.DEFAULT_OPTIONS.ease];
        }
    } else if (TW.getType(this._options.ease) === "Function") {
        easeFun = this._options.ease;
    } else {
        easeFun = TW.ease[TW.DEFAULT_OPTIONS.ease];
    }

    if (this._runType == "auto" && requestAnimationFrame) {
        runFrame();
    } else {
        me._iId = setInterval(keyFun, this._options.interval);
    }

    function keyFun() {
        var crtSts = {},
            at = me._time,
            st = me._startTime,
            now = TW.gts(),
            tp, pec,
            p, fm = me._fm,
            tm = me._tm,
            fo, to;

        tp = (now - st) / at;
        pec = easeFun(tp);
        
        if (tp >= 1) {
            me.finish();
        }
    
        for (p in me._sm) {
            fo = fm[p];
            to = tm[p];
            crtSts[p] = pec * (to - fo);
        }

        me._frameCount++;
        
        console.log(me._frameCount * 1000 / (now - st))

        if (TW.getType(cb) === "Function") {
            cb.call(hook, crtSts);
        }
    }

    function runFrame() {
        if (me._status == 3) {
            return;
        }
        keyFun();
        requestAnimationFrame(runFrame);
    }

    return this;
}

/**
 * @description stop the animation
 */
TW.prototype.finish = function() {
    this._status = 3;
    clearInterval(this._iId);
}

/**
 * @description set the options
 */
TW.prototype.finish = function() {
    this._status = 3;
    clearInterval(this._iId);
}

TW.prototype.setOptions = function(optObj) {
    var p;
    for (p in optObj) {
        if (optObj.hasOwnProperty(p) && TW.DEFAULT_OPTIONS.hasOwnProperty(p)) {
            this._options[p] = optObj[p];
        }
    }
}
