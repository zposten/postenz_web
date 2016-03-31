describe("Util", function () {

    describe("parseTime", function () {

        it("should parse AM times correctly", function () {
            expect(util.parseTime('12 AM').getHours()).toEqual(0);
            expect(util.parseTime('8 AM').getHours()).toEqual(8);
            expect(util.parseTime('9 AM').getHours()).toEqual(9);
        });

        it("should parse PM times correctly", function () {
            expect(util.parseTime('12 PM').getHours()).toEqual(12);
            expect(util.parseTime('2 PM').getHours()).toEqual(14);
            expect(util.parseTime('8 PM').getHours()).toEqual(20);
        });

    });

});