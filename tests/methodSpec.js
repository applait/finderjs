describe("Applait.Finder.prototype.splitname method", function () {

    var finder = new Applait.Finder();
    var splitname = finder.splitname("/sdcard/DCIM/100MZLLA/1.jpg");

    it("it should have the basename of the file with extension ", function (){
        expect(splitname.name).toBe("1.jpg");
    });

    it("it should have path to the file's directory", function (){
        expect(splitname.path).toBe("/sdcard/DCIM/100MZLLA");
    });
});

describe("Applait.Finder.prototype.checkhidden method", function() {

    describe("when this.hidden is true", function () {

        var finder = new Applait.Finder({ hidden: true });

        it("should return true when file path has hidden elements.", function (){
            expect(finder.checkhidden("/sdcard/DCIM/100MZLLA/.1.jpg")).toBe(true);
            expect(finder.checkhidden("/sdcard/DCIM/.100MZLLA/.1.jpg")).toBe(true);
            expect(finder.checkhidden("/sdcard/DCIM/.100MZLLA/1.jpg")).toBe(true);
        });


        it("should return true when file path does not have hidden elements.", function (){
            expect(finder.checkhidden("/sdcard/DCIM/100MZLLA/1.jpg")).toBe(true);
        });

    });

    describe("when this.hidden is false", function () {

        var finder = new Applait.Finder({ hidden: false });

        it("should return true when file path does not have hidden elements.", function (){
            expect(finder.checkhidden("/sdcard/DCIM/100MZLLA/1.jpg")).toBe(true);
        });

        it("should return false when file path has hidden elements.", function (){
            expect(finder.checkhidden("/sdcard/DCIM/100MZLLA/.1.jpg")).toBe(false);
            expect(finder.checkhidden("/sdcard/DCIM/.100MZLLA/.1.jpg")).toBe(false);
            expect(finder.checkhidden("/sdcard/DCIM/.100MZLLA/1.jpg")).toBe(false);
        });

    });

});

describe("Applait.Finder.prototype.log method", function () {

    var finder;

    beforeEach(function () {
        finder = new Applait.Finder();
    });

    describe("log method takes two argument", function () {

        it("finder.log.length should return 2", function (){
            expect(finder.log.length).toBe(2);
        });

    });

    describe("this.debugmode is true", function () {

        beforeEach(function () {
            finder.debugmode = true;
            spyOn(console, 'log');
            finder.log("number", [1,2,3]);
        });

        it("console.log should have been called", function (){
            expect(console.log).toHaveBeenCalled();
        });

        it("console.log should print both argument", function (){
            expect(console.log).toHaveBeenCalledWith("number", [1,2,3]);
        });

    });

    describe("this.debugmode is false", function () {

        beforeEach(function () {
            finder.debugmode = false;
            spyOn(console, 'log');
            finder.log("number", [3,4,5]);
        });

        it("console.log should not called", function (){
            expect(console.log).not.toHaveBeenCalled();
        });

        it("console.log should not print any argument", function (){
            expect(console.log).not.toHaveBeenCalledWith("number", [3,4,5]);
        });

    });

});

describe("Applait.Finder.prototype.matchname method", function () {

    describe("searchkey matches and this.checkhidden() is true/false", function () {

        var finder = new Applait.Finder();
        finder.searchkey = "Aa";
        finder.casesensitive = true;

        it("should return true if this.checkhidden() is true", function (){
            finder.checkhidden = function () {
                return true;
            };
            var matchname = finder.matchname("Aa.jpg", "/sdcard/DCIM/100MZLLA/Aa.jpg");

            expect(matchname).toBe(true);
        });

        it("should retun false if this.checkhidden() is false", function (){
            finder.checkhidden = function () {
                return false;
            };
            var matchname = finder.matchname(".Aa.jpg", "/sdcard/DCIM/100MZLLA/.Aa.jpg");

            expect(matchname).toBe(false);
        });

    });

    describe("this.casesensitive is true/false", function () {

        var finder = new Applait.Finder();
        finder.searchkey = "fb";
        finder.checkhidden = function () {
            return true;
        };

        it("should return false if this.casesensitive is true", function (){
            finder.casesensitive = true;
            var matchname = finder.matchname("FB.jpg", "/sdcard/DCIM/100MZLLA/FB.jpg");

            expect(matchname).toBe(false);
        });

        it("should retun true if this.casesensitive is false", function (){
            finder.casesensitive = false;
            var matchname = finder.matchname("FB.jpg", "/sdcard/DCIM/100MZLLA/FB.jpg");

            expect(matchname).toBe(true);
        });

    });

});
