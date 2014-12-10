describe("Package", function () {

    var request = new XMLHttpRequest(),
        finderjs,
        finderjsmin,
        packagejson;

    // Fetch `src/applait.finder.js` synchronously
    request.open("GET", "src/applait.finder.js", false);  // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        finderjs = request.responseText;
    } else {
        throw "Unable to fetch src/applait.finder.js";
    }

    // Fetch `applait.finder.min.js` synchronously
    request.open("GET", "applait.finder.min.js", false);  // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        finderjsmin = request.responseText;
    } else {
        throw "Unable to fetch applait.finder.min.js";
    }

    // Fetch `package.json` synchronously
    request.open("GET", "package.json", false);  // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        packagejson = JSON.parse(request.responseText);
    } else {
        throw "Unable to fetch package.json";
    }

    // start the real tests
    it ("should have same version string throughout.", function () {
        var re = /@version\s([0-9.]+([a-z0-9-.]+)?)/,
            srcversion,
            minversion;

        try {
            srcversion = finderjs.match(re)[1];
        } catch (e) {
            throw "Unable to find version string in src/applait.finder.js. " + e.message;
        }

        try {
            minversion = finderjsmin.match(re)[1];
        } catch (e) {
            throw "Unable to find version string in applait.finder.min.js. " + e.message;
        }

        expect(srcversion).toBe(packagejson.version.toString());
        expect(srcversion).toBe(minversion);
        expect(minversion).toBe(packagejson.version.toString());
    });

    // Test package.json integrity
    it("definition file, package.json should have proper data.", function () {

        expect(packagejson).toEqual({
            "name": "finderjs",
            "version": "1.1.3",
            "description": "Device Storage search and file picker library for Firefox OS",
            "main": "src/applait.finder.js",
            "directories": {
                "doc": "docs"
            },
            "repository": {
                "type": "git",
                "url": "git://github.com/applait/finderjs.git"
            },
            "keywords": [
                "firefoxos",
                "devicestorage"
            ],
            "author": {
                "name": "Applait Technologies LLP",
                "email": "ask@applait.com",
                "url": "http://applait.com"
            },
            "license": "MIT",
            "readmeFilename": "README.md",
            "bugs": {
                "url": "https://github.com/applait/finderjs/issues"
            },
            "devDependencies": {
                "grunt": "~0.4.5",
                "grunt-contrib-jshint": "~0.10.0",
                "grunt-contrib-uglify": "~0.5.0",
                "grunt-jsdoc": "~0.6.1",
                "grunt-contrib-jasmine": "~0.8.1",
                "grunt-contrib-connect": "~0.9.0"
            },
            "scripts": {
                "test": "grunt test",
                "build": "grunt build"
            }
        });
    });


});
