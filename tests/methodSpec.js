describe("Applait.Finder.prototype splitname function", function () {

    var finder = new Applait.Finder();
    var splitname = finder.splitname("/sdcard/DCIM/100MZLLA/1.jpg");

    it("it should have the basename of the file with extension ", function (){
        expect(splitname.name).toBe("1.jpg");
    });

    it("it should have path to the file's directory", function (){
        expect(splitname.path).toBe("/sdcard/DCIM/100MZLLA");
    });
});
