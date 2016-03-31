// Generated by CoffeeScript 1.10.0
(function() {
  var TableMaker;

  TableMaker = (function() {
    function TableMaker(sectionDoubleArr) {
      this.schedules = sectionDoubleArr;
    }

    TableMaker.prototype.makeHtml = function() {
      var classDivs, i, len, ref, sectionArr, tableHtml, tables;
      tables = [];
      ref = this.schedules;
      for (i = 0, len = ref.length; i < len; i++) {
        sectionArr = ref[i];
        tableHtml = this.makeBasicTableHtml(sectionArr);
        classDivs = this.makeClassDivs(sectionArr);
        tables.push('<div class="schedule"><div class="schedule-table">' + tableHtml + classDivs + '</div></div>');
      }
      return tables.join('\n');
    };

    TableMaker.prototype.makeBasicTableHtml = function(sectionArr) {
      var hour, i, len, ref, rowTempl, tableHtml, tableRows, thead, tr;
      thead = ["<thead>", "  <tr>", "    <th class='time'>Time</th>", "    <th>Monday</th>", "    <th>Tuesday</th>", "    <th>Wednesday</th>", "    <th>Thursday</th>", "    <th>Friday</th>", "  </tr>", "</thead>"].join('\n');
      tr = ["<tr>", "  <th>{{:time}}</th>", "  <td></td>", "  <td></td>", "  <td></td>", "  <td></td>", "  <td></td>", "</tr>"].join('\n');
      rowTempl = $.templates(tr);
      this.tableTimeRange = this.getTimeRange(sectionArr);
      tableRows = '';
      ref = this.tableTimeRange;
      for (i = 0, len = ref.length; i < len; i++) {
        hour = ref[i];
        tableRows += rowTempl.render({
          time: util.formatHour(hour)
        });
      }
      tableHtml = "<table>" + thead + "<tbody>" + tableRows + "</tbody></table>";
      return tableHtml;
    };

    TableMaker.prototype.getTimeRange = function(sectionArr) {
      var endHour, first, i, j, k, last, len, len1, ref, results, secFirst, secLast, section, session, startHour;
      first = null;
      last = null;
      for (i = 0, len = sectionArr.length; i < len; i++) {
        section = sectionArr[i];
        secFirst = null;
        secLast = null;
        ref = section.sessions;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          session = ref[j];
          if ((secFirst === null) || (session.startTime < secFirst)) {
            secFirst = session.startTime;
          }
          if ((secLast === null) || (session.endTime > secLast)) {
            secLast = session.endTime;
          }
        }
        if ((first === null) || (secFirst < first)) {
          first = secFirst;
        }
        if ((last === null) || (secLast > last)) {
          last = secLast;
        }
      }
      if (first === null || last === null) {
        return [0];
      }
      startHour = first.getHours();
      endHour = last.getHours();
      if (last.getMinutes() > 0) {
        endHour++;
      }
      startHour--;
      endHour++;
      return (function() {
        results = [];
        for (var k = startHour; startHour <= endHour ? k <= endHour : k >= endHour; startHour <= endHour ? k++ : k--){ results.push(k); }
        return results;
      }).apply(this);
    };

    TableMaker.prototype.makeClassDivs = function(sectionArr) {
      var classDiv, divs, i, j, len, len1, range, ref, sec, sectionIndex, ses, tableStartTime;
      divs = [];
      tableStartTime = new Date();
      range = this.tableTimeRange;
      tableStartTime.setHours(range[0]);
      tableStartTime.setMinutes(0);
      sectionIndex = 0;
      for (i = 0, len = sectionArr.length; i < len; i++) {
        sec = sectionArr[i];
        ref = sec.sessions;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          ses = ref[j];
          classDiv = this.makeClassDiv(sec.courseNumber, sec.number, ses.dow, sectionIndex, ses.startTime, ses.lengthInMins(), tableStartTime);
          divs.push(classDiv);
        }
        sectionIndex++;
      }
      return divs.join("\n");
    };

    TableMaker.prototype.makeClassDiv = function(courseNumber, sectionNumber, dow, colorIndex, classStartTime, lengthInMins, tableStartTime) {
      var baseHtml, dataObj;
      baseHtml = ["<div class='{{:dayClass}} {{:colorClass}}' style='height: {{:height}}px;top: {{:top}}px;'>", "  <div class='course-text'>", "    <span class='course-name' style='max-height: {{:height-5}}px;'>", "      {{:courseNumber}}/{{:sectionNumber}}", "    </span>", "  </div>", "</div>"].join("\n");
      dataObj = {
        dayClass: this.getDayClass(dow),
        colorClass: this.getColorClass(colorIndex),
        height: this.calcHeight(lengthInMins),
        top: this.calcTopMargin(classStartTime, tableStartTime),
        courseNumber: courseNumber,
        sectionNumber: sectionNumber
      };
      return $.templates(baseHtml).render(dataObj);
    };

    TableMaker.prototype.getDayClass = function(dow) {
      switch (dow) {
        case 1:
          return 'dayM';
        case 2:
          return 'dayT';
        case 3:
          return 'dayW';
        case 4:
          return 'dayR';
        case 5:
          return 'dayF';
      }
      return '';
    };

    TableMaker.prototype.getColorClass = function(colorIndex) {
      return 'color' + (colorIndex % 7);
    };

    TableMaker.prototype.calcHeight = function(lengthInMins) {
      lengthInMins = Math.max(lengthInMins, 25);
      return this.pixelHeightOfOneMin() * lengthInMins;
    };

    TableMaker.prototype.pixelHeightOfOneMin = function() {
      return 50 / 60;
    };

    TableMaker.prototype.calcTopMargin = function(classStartTime, tableStartTime) {
      var hourOffset, minuteOffset, titleBarHeight;
      hourOffset = classStartTime.getHours() - tableStartTime.getHours();
      minuteOffset = (hourOffset * 60) + classStartTime.getMinutes() - tableStartTime.getMinutes();
      titleBarHeight = 25;
      return titleBarHeight + (this.pixelHeightOfOneMin() * minuteOffset);
    };

    return TableMaker;

  })();

  window.TableMaker = TableMaker;

}).call(this);

//# sourceMappingURL=tableMaker.js.map
