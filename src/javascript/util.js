var util = util || {};

util.readTextFile = function (file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                return allText;
            }
        }
    };
    rawFile.send(null);
};


util.sleep = function (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
};


util.randArrEntry = function (arr) {
    var index = util.randInt(arr.length);
    return arr[index];
};


util.randInt = function (length, offset) {
    var num = Math.random() * length;
    if (offset) num += offset;
    return Math.floor(num);
};

util.parseTime = function (strTime) {
    var time = strTime.match(/(\d+)(?::(\d\d))?\s*(p?)/);

    var d = new Date();
    d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    d.setMinutes(parseInt(time[2]) || 0);
    return d;
};

util.formatHour = function (hour) {
    if (hour == 0) {
        return "12:00 AM";
    }
    if (hour < 12) {
        return hour + ":00 AM";
    }
    if (hour == 12) {
        return "12:00 PM";
    }
    hour -= 12;
    return hour + ":00 PM";
};