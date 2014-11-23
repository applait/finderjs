module.exports = function (grunt) {

    // Project configuration
    grunt.initConfig({

        jasmine: {
            src: [
                "src/libs/EventEmitter.js",
                "src/applait.finder.js"
            ],
            options: {
                specs: "tests/*Spec.js"
            }
        },

        jshint: {
            all: ["src/applait.finder.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        uglify: {
            options: {
                compress: true,
                preserveComments: "some",
                mangle: false
            },
            build: {
                src: ["./src/libs/EventEmitter.js", "./src/applait.finder.js"],
                dest: "./applait.finder.min.js"
            }
        },

        jsdoc: {
            dist: {
                src: ["./src/", "./README.md"],
                options: {
                    destination: "./docs/",
                    configure: "jsdoc.conf.json"
                }
            }
        }

    });

    // Load plugins
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-jsdoc");

    // Register tests
    grunt.registerTask("test", ["jshint", "jasmine"]);

    // Register docs
    grunt.registerTask("docs", ["jsdoc"]);

    // Register build tasks
    grunt.registerTask("build", ["test", "docs", "uglify"]);

    // Run tests by default
    grunt.registerTask("default", ["test"]);
};
