function randInt(start, end) {
    return start + Math.floor(Math.random()*(end-start+1));
}
function getEl(id) {
    return document.getElementById(id);
}


var aniMt = {
    moveFPS: 30,
    renderFPS: 24,
	objCount: 0,
	list: [],
	timers: {
		"mover": [null, "aniMt.move()",Math.round(1000/30)],
		"renderer": [null, "aniMt.render()",Math.round(1000/22)]
	},
	addObj: function(aniObj) {
		++this.objCount;
        for (var i in this.list) {
			if (this.list[i] == null) {
				this.list[i] = aniObj;
				return;
			}
		}
		this.list.push(aniObj);
	},
	getObj: function(id) {
		for (var i in this.list) {
			var el = this.list[i];
			if (el == null) continue;
			if (el.id == id) return el;
		}
	},
	remObj: function(id) {
		for (var i in this.list) {
			var el = this.list[i];
			if (el == null) continue;
			if (el.id == id) {
				this.list[i] = null;
				el.finalize();
				--this.objCount;
			}
		}
	},
	render: function() {
        for (var i in this.list) {
			var el = this.list[i];
			if (el == null) continue;
			el.render();
		}
	},
	move: function() {
        for (var i in this.list) {
			var el = this.list[i];
			if (el == null) continue;
			if (el.move()) {
				this.list[i] = null;
				el.finalize();
				--this.objCount;
			}
		}
	},
	start: function() {
        for (var i in this.timers) {
			var tmr = this.timers[i];
			if (tmr[0] == null) {
				tmr[0] = setInterval(tmr[1], tmr[2]);
			}
		}
	},
	stop: function() {
        for (var i in this.timers) {
			var tmr = this.timers[i];
			if (tmr[0] != null) {
				clearInterval(tmr[0]);
				tmr[0] = null;
			}
		}
	},
	addTimer: function(name, func, delay) {
		this.timers[name] = [setInterval(func, delay), func, delay];
	},
	remTimer: function(timername) {
        var curTimer = this.timers[timername];
		if (curTimer != null) clearInterval(curTimer[0]);
		delete this.timers[timername];
	}
}
