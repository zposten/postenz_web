describe("Scheduler", function () {
    var scheduler;
    var input = JSON.parse('[ { "name": "Cloud Computing", "number": "CS 4230", "sections": [ { "number": "011", ' +
        '"sessions": [ { "dows": [1, 3], "startTime": "4:00 PM", "endTime": "4:50 PM" },  { "dows": [2], "startTime": ' +
        '"3:00 PM", "endTime": "4:50 PM" } ] },  { "number": "012", "sessions": [ { "dows": [1, 3], "startTime": ' +
        '"4:00 PM", "endTime": "4:50 PM" },  { "dows": [4], "startTime": "3:00 PM", "endTime": "4:50 PM" } ] } ] },  ' +
        '{ "name": "Complex Variables", "number": "MA 381", "sections": [ { "number": "001", "sessions": [ { "dows": [' +
        '2, 4, 5], "startTime": "2:00 PM", "endTime": "2:50 PM" } ] } ] } ]'
    );

    beforeEach(function() {
        scheduler = new window.Scheduler(input);
    });

    describe("Section", function() {

        describe("Session", function() {

            it("should know that it is overlapping with another session", function() {
                var session1 = new window.test.Session(1, "8:00 AM", "9:50 AM");
                var session2 = new window.test.Session(1, "9:00 AM", "9:50 AM");
                var session3 = new window.test.Session(1, "9:50 AM", "9:51 AM");

                expect(session1.overlap(session2)).toBeTruthy();
                expect(session2.overlap(session1)).toBeTruthy();
            });

            it("should know that it is NOT overlapping with another session", function() {
                var session1 = new window.test.Session(1, "8:00 AM", "9:50 AM");
                var session2 = new window.test.Session(1, "10:00 AM", "10:50 AM");

                expect(session1.overlap(session2)).toBeFalsy();
                expect(session2.overlap(session1)).toBeFalsy();
            });

            it("should know that it is NOT overlapping with another session on a different day", function() {
                var session1 = new window.test.Session(1, "8:00 AM", "9:50 AM");
                var session2 = new window.test.Session(2, "8:00 AM", "9:50 AM");

                expect(session1.overlap(session2)).toBeFalsy();
                expect(session2.overlap(session1)).toBeFalsy();
            });

        });


        var jsonSessions = [
            {
                dows: [1, 3],
                startTime: "4:00 PM",
                endTime: "4:50 PM"
            },
            {
                dows: [2],
                startTime: "3:00 PM",
                endTime: "4:50 PM"
            },
            {
                dows: [1,2,3],
                startTime: "3:00 PM",
                endTime: "3:50 PM"
            },
            {
                dows: [1,2,3],
                startTime: "8:00 AM",
                endTime: "9:50 AM"
            }
        ];

        it("should know that it is overlapping with itself", function() {
            var section1 = new window.test.Section("course", "1", "1", [jsonSessions[0], jsonSessions[1]]);
            expect(section1.overlap(section1)).toBeTruthy();
        });

        it("should know that it is overlapping with another Section", function() {
            var section1 = new window.test.Section("course", "1", "1", [jsonSessions[0], jsonSessions[1]]);
            var section2 = new window.test.Section("course", "1", "1", [jsonSessions[2]]);
            expect(section1.overlap(section2)).toBeTruthy();
        });

        it("should know that it is NOT overlapping with another Section", function() {
            var section1 = new window.test.Section("course", "1", "1", [jsonSessions[0], jsonSessions[1]]);
            var section2 = new window.test.Section("course", "1", "1", [jsonSessions[3]]);
            expect(section1.overlap(section2)).toBeTruthy();
        });


    });


});