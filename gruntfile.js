module.exports = function (grunt) {

    var webpack = require("webpack");
    var webpackConfig = require("./webpack.config.js");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        webpack: {
            options: webpackConfig,
            "build-dev": {
                devtool: "sourcemap",
                debug: true
            }
        },
        uglify: {
            dist: {
                src: "assets/js/transpiled/app.transpiled.js",
                dest: "dist/assets/js/app.min.js"
            }
        },
        cssmin: {
            dist: {
                src: "assets/css/main.css",
                dest: "dist/assets/css/main.min.css"
            }
        },
        sass: {
            options: {
                sourceMap: false,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'assets/css/main.css': 'assets/sass/modules.scss'
                }
            }
        },
        'sass-convert': {
            options: {
                indent: 4
            },
            files: {
                src: ['/assets/sass/modules.scss'],
                dest: '/assets/css/main.css'
            },
        },
        watch: {
            js: {
                files: ['assets/**/*.js', 'assets/**/*.jsx'],
                tasks: ['webpack', 'uglify', 'clean'],
                options: {
                    livereload: true,
                }
            },
            css: {
                files: ['assets/**/*.scss', 'assets/**/*.css'],
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true,
                }
            }
        },
        clean: {
            dist: {
                src: ['assets/js/transpiled']
            }
        }
    });

    grunt.loadNpmTasks("grunt-webpack");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask("default", ["webpack", "uglify", "sass", "cssmin", "clean", "watch"]);
    grunt.registerTask("js", ["webpack", "uglify", "clean", "watch"]);
}