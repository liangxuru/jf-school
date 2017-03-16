//幻灯片
export default {
	name: 'image',
	init: function(settings){
		this.index = settings.index || 0;
		this.container = settings.target;
		this.content = this.container.children().first();
		this.timer = settings.timer || 3000;
		this.animate = settings.animate || 500;
		this.num = settings.num;
		this.list = this.content.children();
		this.step = this.list.first().width();
		this.content.width(this.list.length * this.step);
		this.size = this.list.length;
		this.content.css({
			left: 0,
			position: "absolute"
		});
		this.bindEvent();
		this.auto();
		this.formatNum();
	},
	touch: function(obj, trigger, fn) {
		var move;
		var istouch = false;
		if (typeof trigger === "function") {
			fn = trigger;
		};
		$(obj).on('touchmove', trigger, function(e) {
			move = true;
		}).on('touchend', trigger, function(e) {
			e.preventDefault();
			if (!move) {
				var returnvalue = fn.call(this, e, 'touch');
				if (returnvalue === false) {
					e.preventDefault();
					e.stopPropagation();
				}
			}
			move = false;
		});
		$(obj).on('click', trigger, click);
		function click(e) {
			return fn.call(this, e);
		}
	},
	bindEvent: function() {
		var _this = this;
		var start = {},
			istartleft = 0,
			end = {},
			move = false;
		var curPos = {};
		this.content.on('touchstart', function(e) {
			start = {
				x: e.originalEvent.changedTouches[0].pageX
			};
			if (e.originalEvent.targetTouches.length == 2) {
				move = false;
				return false;
			};
			curPos = $(this).position();
			istartleft = start.x;
			clearInterval(_this.interval);
		}).on('touchmove', function(e) {
			if (e.originalEvent.targetTouches.length == 2) {
				return false;
			}
			move = true;
			end = {
				x: e.originalEvent.changedTouches[0].pageX
			};
			// var curPos = $(this).position();
			if (!_this.bloom) {
				//只移动x轴
				curPos.left = curPos.left + (end.x - start.x);
				$(this).css({
					left: curPos.left
				});
			} else {
				curPos = {
					left: curPos.left + (end.x - start.x)
				}
				$(this).css(curPos);
			}
			start = end;
			return false;
		}).on('touchend', function(e) {
			end = {
				x: e.originalEvent.changedTouches[0].pageX
			};
			var curPos = $(this).position();
			var stopPos = {
				left: curPos.left + (end.x - start.x)
			};
			$(this).css(stopPos);
			if (end.x > istartleft) {
				_this.index = (--_this.index + _this.size)%_this.size;
			} else {
				_this.index = (++_this.index)%_this.size;
			}
			_this.go();
			move = false;
			_this.auto();
			return false;
		});
		_this.touch(_this.num,"i",  function() {
			clearInterval(_this.interval);
			_this.index = $(this).index();
			_this.go();
			_this.auto();
		});
	},
	formatNum: function() {
		this.num && this.num.children().map((i, item)=>{
			if(i == this.index){
				item.className = 'current';
			}else{
				item.className = '';
			}
		});
	},
	go: function() {
		var _this = this;
		var step = _this.step;
		var left = -_this.index * step;
		_this.content.animate({
			left: left
		}, _this.animate, $.proxy(_this.formatNum, _this));
	},
	auto: function() {
		var _this = this;
		clearTimeout(this.interval);
		this.interval = setInterval(function() {
			_this.index = (++_this.index)%_this.size;
			_this.go();
		}, _this.timer);
	}
}