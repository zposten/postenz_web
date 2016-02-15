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
    var time = strTime.match(/(\d+)(?::(\d\d))?\s*([pP]?)/);

    var d = new Date();
    var hours = parseInt(time[1], 10);
    var minutes = parseInt(time[2], 10);

    var isPM = time[3];
    var increment = isPM ? 12 : 0;

    if (hours == 12) {
        if(isPM) {
            increment = 0;
        } else {
            hours = 0;
        }
    }

    d.setHours(hours + increment);
    d.setMinutes(minutes || 0);
    d.setSeconds(0);

    //var str = 'PARSETIME:  \n\tinput: {0}\n\thours: {1}\n\tmins: {2}\n\tisPM: {3}\n\tincrement: {4}\n\toutput: {5}';
    //console.log(str.format(strTime, hours, minutes, isPM, increment, d.toLocaleTimeString()));

    return d;
};

util.formatHour = function (hour) {
    if (hour == 0) return "12:00 AM";
    if (hour < 12) return hour + ":00 AM";
    if (hour == 12) return "12:00 PM";
    return (hour - 12) + ":00 PM";
};

/***************************************/
/** JAVASCRIPT LANGUAGE MANIPULATIONS */
/*************************************/

Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**
 * Add a format() method to the string prototype
 */
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}