/* jshint jasmine: true */
/* global Applait */
describe("Applait.Finder class", function () {

    var finder;

    beforeEach(function () {
        finder = new Applait.Finder();
    });

    it("should exist.", function () {
        expect(Applait).toBeDefined();
        expect(Applait.Finder).toBeDefined();
        expect(finder).toBeDefined();
    });

    it("should be a constructor.", function () {
        expect((new Applait.Finder()) instanceof Applait.Finder).toBe(true);
    });

    it("should inherit from EventEmitter.", function () {
        expect(Applait.Finder.prototype instanceof EventEmitter).toBe(true);
    });

    it("should have sane default values.", function (){
        expect(finder.options).toBeDefined();
        expect(finder.type).toBe("sdcard");
        expect(finder.minsearchlength).toBe(3);
        expect(finder.casesensitive).toBe(false);
        expect(finder.debugmode).toBe(false);
        expect(finder.hidden).toBe(false);
    });

    it("should have default properties set up with proper values.", function () {
        expect(finder.searchcompletecount).toBe(0);
        expect(finder.filematchcount).toBe(0);
        expect(finder.searchkey).toBe("");
    });
});
