import Vue from 'vue'

Vue.filter('DateFormat', (value, format)=>{
    var val = value;
    if (val.indexOf("GMT") != -1) {

    }
    else {
        val = val.replace("T", " ").replace(/-/g, "/").replace(/[.]\d*/, "");
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
});

Vue.filter('currency', (value, currency, decimals)=>{
    const digitsRE = /(\d{3})(?=\d)/g
    value = parseFloat(value)
      if (!isFinite(value) || (!value && value !== 0)) return ''
      currency = currency != null ? currency : '￥'
      decimals = decimals != null ? decimals : 2
      var stringified = Math.abs(value).toFixed(decimals)
      var _int = decimals
        ? stringified.slice(0, -1 - decimals)
        : stringified
      var i = _int.length % 3
      var head = i > 0
        ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
        : ''
      var _float = decimals
        ? stringified.slice(-1 - decimals)
        : ''
      var sign = value < 0 ? '-' : ''
      return sign + currency + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float
});