// Generated by CoffeeScript 1.10.0
(function() {
  var Course, Scheduler, Section, Session, test,
    slice = [].slice;

  Session = (function() {
    function Session(dow1, strStartTime, strEndTime) {
      this.dow = dow1;
      this.startTime = this.parseTime(strStartTime);
      this.endTime = this.parseTime(strEndTime);
    }

    Session.prototype.parseTime = function(strTime) {
      var d, hours, increment, isPM, minutes, time;
      time = strTime.match(/(\d+)(?::(\d\d))?\s*([pP]?)/);
      d = new Date();
      hours = parseInt(time[1], 10);
      minutes = parseInt(time[2], 10);
      isPM = time[3];
      increment = isPM ? 12 : 0;
      if (hours === 12) {
        if (isPM) {
          increment = 0;
        } else {
          hours = 0;
        }
      }
      d.setHours(hours + increment);
      d.setMinutes(minutes || 0);
      d.setSeconds(0);
      return d;
    };

    Session.prototype.overlap = function(otherSession) {
      var onSameDay, thatEndsAfterThisStarts, thatOverlapsThis, thatStartsB4ThisEnds, thisEndsAfterThatStarts, thisOverlapsThat, thisStartsB4ThatEnds;
      onSameDay = this.dow === otherSession.dow;
      if (!onSameDay) {
        return false;
      }
      thatStartsB4ThisEnds = otherSession.startTime < this.endTime;
      thatEndsAfterThisStarts = otherSession.endTime > this.startTime;
      thisOverlapsThat = thatStartsB4ThisEnds && thatEndsAfterThisStarts;
      thisStartsB4ThatEnds = this.startTime < otherSession.endTime;
      thisEndsAfterThatStarts = this.endTime > otherSession.startTime;
      thatOverlapsThis = thisStartsB4ThatEnds && thisEndsAfterThatStarts;
      return thisOverlapsThat || thatOverlapsThis;
    };

    return Session;

  })();

  Section = (function() {
    function Section(courseName, courseNumber, number, jsonSessions) {
      var dow, i, j, jsonSession, len, len1, ref;
      this.courseName = courseName;
      this.courseNumber = courseNumber;
      this.number = number;
      this.sessions = [];
      for (i = 0, len = jsonSessions.length; i < len; i++) {
        jsonSession = jsonSessions[i];
        ref = jsonSession.dows;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          dow = ref[j];
          this.sessions.push(new Session(dow, jsonSession.startTime, jsonSession.endTime));
        }
      }
    }

    Section.prototype.overlap = function(otherSection) {
      var i, j, len, len1, mySession, overlap, ref, ref1, theirSession;
      overlap = false;
      ref = this.sessions;
      for (i = 0, len = ref.length; i < len; i++) {
        mySession = ref[i];
        ref1 = otherSection.sessions;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          theirSession = ref1[j];
          overlap = overlap || mySession.overlap(theirSession);
        }
      }
      return overlap;
    };

    return Section;

  })();

  Course = (function() {
    function Course(name, number, sections) {
      this.name = name;
      this.number = number;
      this.sections = sections != null ? sections : [];
    }

    Course.prototype.addSection = function(section) {
      return this.sections.push(section);
    };

    return Course;

  })();

  Scheduler = (function() {
    function Scheduler(objCourses) {
      this.parseObj(objCourses);
    }

    Scheduler.prototype.parseObj = function(jsonCourses) {
      var c, course, i, j, len, len1, ref, results, sec;
      this.courses = [];
      results = [];
      for (i = 0, len = jsonCourses.length; i < len; i++) {
        c = jsonCourses[i];
        course = new Course(c.name, c.number);
        ref = c.sections;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          sec = ref[j];
          course.addSection(new Section(c.name, c.number, sec.number, sec.sessions));
        }
        results.push(this.courses.push(course));
      }
      return results;
    };

    Scheduler.prototype.combine = function() {
      var schedules;
      schedules = [];
      this.recursiveCombine(this.courses, [], schedules);
      return schedules;
    };

    Scheduler.prototype.recursiveCombine = function(courses, chosenSections, schedules) {
      var course, i, len, next, ref, results, section;
      if (chosenSections.length === Object.size(courses)) {
        schedules.push(slice.call(chosenSections));
        return;
      }
      next = chosenSections.length;
      course = courses[next];
      ref = course.sections;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        section = ref[i];
        if (!this.overlap(section, chosenSections)) {
          chosenSections.push(section);
          this.recursiveCombine(courses, chosenSections, schedules);
          results.push(chosenSections.pop());
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    Scheduler.prototype.overlap = function(secA, sectionsArr) {
      var i, len, secB;
      for (i = 0, len = sectionsArr.length; i < len; i++) {
        secB = sectionsArr[i];
        if (secA.overlap(secB)) {
          return true;
        }
      }
      return false;
    };

    Scheduler.prototype.makeSchedules = function() {
      var tableMaker;
      this.schedules = this.combine();
      tableMaker = new TableMaker(this.schedules);
      return tableMaker.makeHtml();
    };

    return Scheduler;

  })();

  window.Scheduler = Scheduler;

  test = {
    Section: Section,
    Session: Session
  };

  window.test = test;

}).call(this);

//# sourceMappingURL=scheduler.js.map
