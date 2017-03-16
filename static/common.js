var __version = 1.06;

function getArgs(name, url) {
    if (!url) url = window.location.href;
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
    if (results == null) {
        return null;
    }
    else {
        return decodeURIComponent(results[1]);
    }
}

function exit() {
    throw new Error('not error,just exit js');
}

function getServerURL() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    return strFullPath.substring(0, pos + 1);
}

function clearHashPart(part) {
    if (window.location.hash.indexOf(part) != -1) {
        window.location.hash = window.location.hash.replace(part, "");
    }
}

var zeros = ["", "0", "00", "000", "0000"];
function pad(number, digits) {
    number = number + "";
    digits = digits || 2;
    end = digits - number.length;

    if (end) {
        return zeros[digits].substring(0, end) + number;
    }

    return number;
}
String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
    return true;
}
String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
}
String.prototype.formatDate = function (format) {
    var val = this.valueOf();
    if (this.valueOf().indexOf("GMT") != -1) {

    }
    else {
        val = this.valueOf().replace("T", " ").replace(/-/g, "/").replace(/[.]\d*/, "");
    }
    var date = new Date(val);
    return format.replace(/dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|"[^"]*"|'[^']*'/g, function (match) {
        var result;
        if (match === "d") {
            result = date.getDate();
        } else if (match === "dd") {
            result = pad(date.getDate());
        } else if (match === "ddd") {
            result = days.namesAbbr[date.getDay()];
        } else if (match === "dddd") {
            result = days.names[date.getDay()];
        } else if (match === "M") {
            result = date.getMonth() + 1;
        } else if (match === "MM") {
            result = pad(date.getMonth() + 1);
        } else if (match === "MMM") {
            result = months.namesAbbr[date.getMonth()];
        } else if (match === "MMMM") {
            result = months.names[date.getMonth()];
        } else if (match === "yy") {
            result = pad(date.getFullYear() % 100);
        } else if (match === "yyyy") {
            result = pad(date.getFullYear(), 4);
        } else if (match === "h") {
            result = date.getHours() % 12 || 12;
        } else if (match === "hh") {
            result = pad(date.getHours() % 12 || 12);
        } else if (match === "H") {
            result = date.getHours();
        } else if (match === "HH") {
            result = pad(date.getHours());
        } else if (match === "m") {
            result = date.getMinutes();
        } else if (match === "mm") {
            result = pad(date.getMinutes());
        } else if (match === "s") {
            result = date.getSeconds();
        } else if (match === "ss") {
            result = pad(date.getSeconds());
        } else if (match === "f") {
            result = math.floor(date.getMilliseconds() / 100);
        } else if (match === "ff") {
            result = math.floor(date.getMilliseconds() / 10);
        } else if (match === "fff") {
            result = date.getMilliseconds();
        } else if (match === "tt") {
            result = date.getHours() < 12 ? calendar.AM[0] : calendar.PM[0];
        }
        return result !== undefined ? result : match.slice(1, match.length - 1);
    });
}

String.prototype.trimStart = function (trimStr) {
    if (!trimStr) { return this; }
    var temp = this;
    while (true) {
        if (temp.substr(0, trimStr.length) != trimStr) {
            break;
        }
        temp = temp.substr(trimStr.length);
    }
    return temp;
};

String.prototype.trimEnd = function (trimStr) {
    if (!trimStr) { return this; }
    var temp = this;
    while (true) {
        if (temp.substr(temp.length - trimStr.length, trimStr.length) != trimStr) {
            break;
        }
        temp = temp.substr(0, temp.length - trimStr.length);
    }
    return temp;
};

String.prototype.trim = function (trimStr) {
    var temp = trimStr;
    if (!trimStr) { temp = " "; }
    return this.trimStart(temp).trimEnd(temp);
};
Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Date.prototype.addDays = function (number) {
    var adjustDate = new Date(this.getTime() + 24 * 60 * 60 * 1000 * number)
    return adjustDate;
}

Date.prototype.subDays = function (number) {
    var adjustDate = new Date(this.getTime() - 24 * 60 * 60 * 1000 * number)
    return adjustDate;
}

var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

function showLayer(content) {
    if ($(".mLayer").length == 0) {
        var html = '<div class="mLayer"></div>';
        $("body").prepend(html);
    }
    $(".mLayer").html('<span class="anchor"></span>');
    $(".mLayer").append(content);
    var obj = {};
    obj.close = function () {
        $(".mLayer").hide();
        $(window).unbind("touchmove.mlayer");
    }
    $(".mLayer").data("layer", obj);
    $(".mLayer").fadeIn(100, function () {
        $(window).bind("touchmove.mlayer", function (e) {
            e.preventDefault()
        });
    });
}

function showTip(msg,time,callback) {
    if ($(".mTip").length == 0) {
        var html = '<div class="mTip"><span></span><span></span></div>';
        $("body").prepend(html);

    }
    $(".mTip>span:eq(1)").html(msg);
    var work = setTimeout(function () {
        $(".mTip").hide();
        $(".mTip>span:eq(1)").empty();
        $(window).unbind("touchmove.mtip");
        (callback && typeof (callback) === "function") && callback.apply();
    }, time ? time : 2500);
    $(".mTip").unbind("click.mtip").bind("click.mtip", function (e) {
        e.stopPropagation();
        $(".mTip").hide();
        $(".mTip>span:eq(1)").empty();
        $(window).unbind("touchmove.mtip");
        clearTimeout(work);
        (callback && typeof (callback) === "function") && callback.apply();
    });
    $(".mTip").fadeIn(100, function () {
        $(window).bind("touchmove.mtip", function (e) {
            e.preventDefault()
        });
    });
};

function showMsg(msg, btnTxt, callback) {
    if ($("#mAlert").length == 0) {
        var html = '<div id="mAlert"><span></span><div><div class="mMsg"></div><div class="mBtn"></div></div></div>';
        $("body").prepend(html);
        
    }
    $("#mAlert .mMsg").html(msg);
    $("#mAlert .mBtn").text(btnTxt ? btnTxt : "确定");
    $("#mAlert .mBtn").unbind("click.malert").bind("click.malert", function (e) {
        e.stopPropagation();
        $("#mAlert").hide();
        $(window).unbind("touchmove.malert");
        (callback && typeof (callback) === "function") && callback.apply();
    });
    $("#mAlert").fadeIn(100, function () {
        $(window).bind("touchmove.malert", function (e) {
            e.preventDefault()
        });
    });
};

function showConfirm(msg, yesCallback, noCallback) {
    if ($("#mConfirm").length == 0) {
        var html = '<div id="mConfirm">\
<span></span><div>\
    <div class="mMsg"></div>\
    <div class="mBtn"><span>确定</span><span>取消</span></div>\
</div></div>';
        $("body").prepend(html);
        
    }
    $("#mConfirm .mMsg").html(msg);
    $("#mConfirm .mBtn>span:first").unbind("click.malert").bind("click.malert", function (e) {
        e.stopPropagation();
        $("#mConfirm").hide();
        $(window).unbind("touchmove.malert");
        (yesCallback && typeof (yesCallback) === "function") && yesCallback.apply();
    });
    $("#mConfirm .mBtn>span:last").unbind("click.malert").bind("click.malert", function (e) {
        $("#mConfirm").hide();
        $(window).unbind("touchmove.malert");
        (noCallback && typeof (noCallback) === "function") && noCallback.apply();
    });
    $("#mConfirm").fadeIn(100, function () {
        $(window).bind("touchmove.malert", function (e) {
            e.preventDefault()
        });
    });
};

function loading(status) {
    if ($(".mLoading").length == 0) {
        $("body").append('<div class="mLoading"><span class="anchor"></span><div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>');
    }
    if (status) {
        $(".mLoading").show();
    }
    else {
        $(".mLoading").hide();
    }
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
}

function lazyLoadImg(selector, root) {
    var elements = document.querySelectorAll(selector);
    var rootEl = root ? root : document.body;
    var offsetTop = rootEl.getBoundingClientRect().top;
    var rootHeight = rootEl.offsetHeight;
    check(elements);
    setInterval(function () {
        var elements = document.querySelectorAll(selector);
        check(elements);
    }, 300)
    function check(els) {
        for (var i = 0; i < els.length; i++) {
            var temp = els[i];
            if (!temp.classList.contains("lazyShow")) {
                if (temp.getBoundingClientRect().top - offsetTop - rootHeight < 10) {
                    var _temp = temp;
                    _temp.src = _temp.getAttribute("lazy-src");
                    $(_temp).bind("load", function (e) {
                        this.classList.add("lazyShow");
                    });
                    $(_temp).bind("error", function (e) {
                        this.classList.add("lazyShow");
                    });
                }
            }
        }
    }
}

function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}

function getSessionData(key) {
    return window.sessionStorage.getItem(key);
};

function setSessionData(key, value) {
    window.sessionStorage.setItem(key, value);
};

function removeSessionData(key) {
    window.sessionStorage.removeItem(key);
};

function getLocalData(key) {
    return window.localStorage.getItem(key);
}

function setLocalData(key,value) {
    return window.localStorage.setItem(key,value);
}

function removeLocalData(key, value) {
    return window.localStorage.removeItem(key);
}

function clearLocalData() {
    return window.localStorage.clear();
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        fileName: a.pathname.split("/").pop(),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}

$.extend({
    /** 
     1. 设置cookie的值，把name变量的值设为value   
    example $.cookie(’name’, ‘value’);
     2.新建一个cookie 包括有效期 路径 域名等
    example $.cookie(’name’, ‘value’, {expires: 7, path: ‘/’, domain: ‘jquery.com’, secure: true});
    3.新建cookie
    example $.cookie(’name’, ‘value’);
    4.删除一个cookie
    example $.cookie(’name’, null);
    5.取一个cookie(name)值给myvar
    var account= $.cookie('name');
    **/
    cookie: function (name, value, options) {
        if (typeof value !== 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    if (options.isZero) {
                        date.setHours(4);
                        date.setMinutes(0);
                        date.setSeconds(0);
                    }
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); //use expires attribute, max-age is not supported by IE
            }
            var path =  '; path=' + (options.path?options.path:'/');
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }

});
$.fn.focusEnd = function () {
    $(this).focus();
    var tmp = $('<span />').appendTo($(this)),
        node = tmp.get(0),
        range = null,
        sel = null;

    if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(node);
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
    tmp.remove();
    return this;
}
function keepDecimalsUp(number, precision) {
    return (number == number.toFixed(precision) ? number.toFixed(precision) : Math.ceil(number * Math.pow(10, precision)) / Math.pow(10, precision));
}

function keepDecimalsDown(number, precision) {
    return (number == number.toFixed(precision) ? number.toFixed(precision) : Math.floor(number * Math.pow(10, precision)) / Math.pow(10, precision));
}

function cookieStorage(maxage, path) {
    var cookie = (function () {
        var cookie = {};
        var all = document.cookie;
        if (all === "") {
            return cookie;
        }
        var list = all.split("; ");
        for (var i = 0; i < list.length; i++) {
            var singleCookie = list[i];
            var p = singleCookie.indexOf("=");
            var name = singleCookie.substring(0, p);
            var value = singleCookie.substring(p + 1);
            value = decodeURIComponent(value);
            cookie[name] = value;
        }
        return cookie;
    }());

    var keys = [];
    for (var key in cookie) {
        keys.push(key);
    }

    this.length = keys.length;
    this.key = function (n) {
        if (n < 0 || n > keys.length - 1) {
            return null;
        }
        return keys[n];
    }
    this.getItem = function () {
        return cookie[name] || null;
    }
    this.setItem = function (key, value) {
        if (!(key in cookie)) {
            keys.push(key);
            this.length++;
        }
        cookie[key] = value;
        var cookie = key + "=" + encodeURIComponent(value);
        if (maxage) {
            cookie += "; max-age=" + maxage;
        }
        if (path) {
            cookie += "; path=" + path;
        }
        document.cookie = cookie;
    }
    this.removeItem = function (key) {
        if (!(key in cookie)) {
            return;
        }
        delete cookie[key];
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === key) {
                keys.splice(i, 1);
                break;
            }
        }
        this.length--;
        document.cookie = key + "=; max-age=0";
    }
    this.clear = function () {
        for (var i = 0; i < keys.length; i++) {
            document.cookie = keys[i] + "=; max-age=0";
        }
        cookie = {};
        keys = [];
        this.length = 0;
    }
}


function tap(e, callback, params) {
    if (e.isTrigger || e.type=="click") {
        (callback && typeof (callback) === "function") && callback.apply(e.currentTarget, params);
    }
    else {
        $(e.currentTarget).data("_ox", e.originalEvent.touches[0].pageX);
        $(e.currentTarget).data("_oy", e.originalEvent.touches[0].pageY);
        $(e.currentTarget).unbind("touchend.tap").bind("touchend.tap", function (e) {
            e.preventDefault();
            var tx = e.originalEvent.changedTouches[0].pageX;
            var ty = e.originalEvent.changedTouches[0].pageY;
            var ox = $(this).data("_ox");
            var oy = $(this).data("_oy");
            var offx = Math.abs(tx - ox);
            var offy = Math.abs(ty - oy);
            if (offx <= 5 && offy <= 5) {
                (callback && typeof (callback) === "function") && callback.apply(e.currentTarget, params);
            }
        });
    }
}
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
