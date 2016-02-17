describe("Scheduler", function () {
    var scheduler;
    var input = JSON.parse('[ { "name": "Cloud Computing", "number": "CS 4230", "sections": [ { "number": "011", ' +
        '"sessions": [ { "dows": [1, 3], "startTime": "4:00 PM", "endTime": "4:50 PM" },  { "dows": [2], "startTime": ' +
        '"3:00 PM", "endTime": "4:50 PM" } ] },  { "number": "012", "sessions": [ { "dows": [1, 3], "startTime": ' +
        '"4:00 PM", "endTime": "4:50 PM" },  { "dows": [4], "startTime": "3:00 PM", "endTime": "4:50 PM" } ] } ] },  ' +
        '{ "name": "Complex Variables", "number": "MA 381", "sections": [ { "number": "001", "sessions": [ { "dows": [' +
        '2, 4, 5], "startTime": "2:00 PM", "endTime": "2:50 PM" } ] } ] } ]'
    );

    var jsonSessions = [
        {dows: [1, 3], startTime: "3:00 PM", endTime: "4:50 PM"},
        {dows: [2], startTime: "3:00 PM", endTime: "4:50 PM"},
        {dows: [1, 2, 3], startTime: "3:00 PM", endTime: "3:50 PM"},
        {dows: [1, 2, 3], startTime: "8:00 AM", endTime: "9:50 AM"},
        {dows: [2, 3], startTime: "12:00 PM", endTime: "1:50 PM"}
    ];

    beforeEach(function () {
        scheduler = new window.Scheduler(input);
    });

    describe("Section", function () {

        describe("Session", function () {

            it("should know that it is overlapping with another session", function () {
                var session1 = new window.test.Session(1, "8:00 AM", "9:50 AM");
                var session2 = new window.test.Session(1, "9:00 AM", "9:50 AM");
                var session3 = new window.test.Session(1, "9:50 AM", "9:51 AM");

                expect(session1.overlap(session2)).toBeTruthy();
                expect(session2.overlap(session1)).toBeTruthy();
            });

            it("should know that it is NOT overlapping with another session", function () {
                var session1 = new window.test.Session(1, "8:00 AM", "9:50 AM");
                var session2 = new window.test.Session(1, "10:00 AM", "10:50 AM");

                expect(session1.overlap(session2)).toBeFalsy();
                expect(session2.overlap(session1)).toBeFalsy();
            });

            it("should know that it is NOT overlapping with another session on a different day", function () {
                var session1 = new window.test.Session(1, "8:00 AM", "9:50 AM");
                var session2 = new window.test.Session(2, "8:00 AM", "9:50 AM");

                expect(session1.overlap(session2)).toBeFalsy();
                expect(session2.overlap(session1)).toBeFalsy();
            });

        });


        it("should should parse its sessions properly", function () {
            var section1 = new window.test.Section("course", "1", "1", [jsonSessions[1]]);
            var section2 = new window.test.Section("course", "1", "1", [jsonSessions[0]]);
            var section3 = new window.test.Section("course", "1", "1", [jsonSessions[0], jsonSessions[1]]);

            expect(section1.sessions[0].dow).toEqual(2);
            expect(section2.sessions[0].dow).toEqual(1);
            expect(section2.sessions[1].dow).toEqual(3);
            expect(section3.sessions[0].dow).toEqual(1);
            expect(section3.sessions[1].dow).toEqual(3);
            expect(section3.sessions[2].dow).toEqual(2);

            var sessions = [
                section1.sessions,
                section2.sessions,
                section3.sessions
            ];
            for (var i = 0; i < sessions.length; ++i) {
                for (var j = 0; j < sessions[i].length; ++j) {
                    expect(sessions[i][j].startTime.getHours()).toEqual(15);
                    expect(sessions[i][j].startTime.getMinutes()).toEqual(0);
                    expect(sessions[i][j].endTime.getHours()).toEqual(16);
                    expect(sessions[i][j].endTime.getMinutes()).toEqual(50);
                }
            }
        });

        it("should know that it is overlapping with itself", function () {
            var section1 = new window.test.Section("course", "1", "1", [jsonSessions[0], jsonSessions[1]]);
            expect(section1.overlap(section1)).toBeTruthy();
        });

        it("should know that it is overlapping with another Section", function () {
            var section1 = new window.test.Section("course", "1", "1", [jsonSessions[0], jsonSessions[1]]);
            var section2 = new window.test.Section("course", "1", "1", [jsonSessions[2]]);
            expect(section1.overlap(section2)).toBeTruthy();
        });

        it("should know that it is NOT overlapping with another Section", function () {
            var section1 = new window.test.Section("course", "1", "1", [jsonSessions[0], jsonSessions[1]]);
            var section2 = new window.test.Section("course", "1", "1", [jsonSessions[2]]);
            expect(section1.overlap(section2)).toBeTruthy();
        });


    });

    describe("TableMaker", function () {
        var tableMaker, section1, section2, section3;

        beforeEach(function () {
            section1 = new window.test.Section("course", "1", "1", [jsonSessions[0]]); // 3 to 4:50
            section2 = new window.test.Section("course", "1", "1", [jsonSessions[2]]); // 3 to 3:50
            section3 = new window.test.Section("course", "1", "1", [jsonSessions[2], jsonSessions[3]]); // 8am to 3:50
            tableMaker = new TableMaker([section1, section2, section3])
        });

        it("should determine the proper time range for a group of sections", function () {
            var hourRange = tableMaker.getTimeRange([section1]);
            expect(hourRange[0]).toEqual(14);
            expect(hourRange[hourRange.length - 1]).toEqual(18);
            expect(hourRange.length).toEqual(5);

            hourRange = tableMaker.getTimeRange([section2]);
            expect(hourRange[0]).toEqual(14);
            expect(hourRange[hourRange.length - 1]).toEqual(17);
            expect(hourRange.length).toEqual(4);
        });

        it("should construct its basic html table correctly", function () {
            expectTableRange(tableMaker.makeBasicTableHtml([section1]), 14, 18);
            expectTableRange(tableMaker.makeBasicTableHtml([section2]), 14, 17);
            expectTableRange(tableMaker.makeBasicTableHtml([section3]), 8, 17);


            function expectTableRange(html, startHour, endHour) {
                for (var i = startHour; i < endHour; ++i) {
                    expect(html).toContain(getRowAtHour(i));
                }

                function getRowAtHour(hour) {
                    var time = util.formatHour(hour);
                    return '<tr><th>' + time + '</th>' + makeTableDataTags(5) + '</tr>';

                    function makeTableDataTags(num) {
                        var str = '';
                        for (var i = 0; i < num; ++i) str += '<td></td>';
                        return str;
                    }
                }
            }
        });
    });

    it("should parse the javascript object properly", function () {
        expect(scheduler.courses.length).toEqual(2);
        expect(scheduler.courses[0].name).toEqual('Cloud Computing');
        expect(scheduler.courses[0].number).toEqual('CS 4230');
        expect(scheduler.courses[0].sections.length).toEqual(2);

        expect(scheduler.courses[0].sections[0].number).toEqual('011');
        expect(scheduler.courses[0].sections[1].number).toEqual('012');
        expect(scheduler.courses[0].sections[0].sessions.length).toEqual(3);
        expect(scheduler.courses[1].sections[0].sessions.length).toEqual(3);

    });

    it("should have sessions with matching starts and ends when created because of differing days of the week", function () {
        var sessions = scheduler.courses[1].sections[0].sessions;
        expect(sessions).toExist();

        var startTime, endTime;
        for (var session in sessions) {
            if (!startTime) {
                startTime = session.startTime;
                endTime = session.endTime;
            } else {
                expect(session.startTime == startTime).toBeTruthy();
                expect(session.endTime == endTime).toBeTruthy();
            }
        }
    });


    it("should know if one section overlaps with a group of sections", function () {
        var section0 = new window.test.Section("course", "1", "1", [jsonSessions[0]]); // mon,wed 3->4:50
        var section1 = new window.test.Section("course", "1", "1", [jsonSessions[1]]); // tue 3->4:50
        var section2 = new window.test.Section("course", "1", "1", [jsonSessions[2]]); // mon,tue,wed 3->3:50
        var section3 = new window.test.Section("course", "1", "1", [jsonSessions[3]]); // mon,tue,wed 8am->9:50
        var section4 = new window.test.Section("course", "1", "1", [jsonSessions[4]]); // tue,wed noon->1:50

        expect(scheduler.overlap(section0, [section0])).toBeTruthy();
        expect(scheduler.overlap(section0, [section1])).toBeFalsy();
        expect(scheduler.overlap(section0, [section2])).toBeTruthy();
        expect(scheduler.overlap(section1, [section2])).toBeTruthy();

        expect(scheduler.overlap(section0, [section1, section2])).toBeTruthy();
        expect(scheduler.overlap(section1, [section3, section4])).toBeFalsy();
    });

    it("should recursively combine courses correctly", function () {
        var schedules = scheduler.combine();
        expect(schedules.length).toEqual(2);
        expect(schedules[0].length).toEqual(2);
        expect(schedules[1].length).toEqual(2);

        expect(schedules[0][0].courseNumber).toEqual('CS 4230');
        expect(schedules[0][0].number).toEqual('011');
        expect(schedules[0][1].courseNumber).toEqual('MA 381');
        expect(schedules[0][1].number).toEqual('001');

        expect(schedules[1][0].courseNumber).toEqual('CS 4230');
        expect(schedules[1][0].number).toEqual('012');
        expect(schedules[1][1].courseNumber).toEqual('MA 381');
        expect(schedules[1][1].number).toEqual('001');

        var html = scheduler.makeSchedules();
        console.log(html);
    });


});