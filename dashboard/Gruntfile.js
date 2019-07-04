module.exports = function (grunt) {

    const appLayout = grunt.option("layout") || "semi-dark-menu" // layout name

    // write custome selected theme.scss file which will import in style.scss and materialize.scss
    grunt.file.write("src/sass/theme.scss", `@import "themes/${appLayout}/theme";`)

    // configure the tasks
    grunt.initConfig({

        // copy all content for dist folder
        copy: {
            main: {
                src: [
                    "fonts/**",
                    "images/**",
                    "vendors/**",
                ],
                expand: true,
                cwd: "src/template",
                dest: "public",
            }
        },

        // SASS Compile css
        sass: {
            main: {
                options: {
                    outputStyle: "expanded",
                    sourcemap: false,
                },
                files: {
                    "public/css/materialize.css": "src/sass/materialize.scss",
                    "public/css/style.css": "src/sass/style.scss",
                    "public/css/style-fullscreen.css": "src/sass/theme-components/layouts/style-fullscreen.scss",
                    "public/css/style-horizontal.css": "src/sass/theme-components/layouts/style-horizontal.scss",
                    "public/css/custom.css": "src/sass/custom/custom.scss"
                }
            },
            dist: {
                options: {
                    outputStyle: "compressed",
                    sourcemap: true
                },
                files: {
                    "public/css/materialize.min.css": "src/sass/materialize.scss",
                    "public/css/style.min.css": "src/sass/style.scss",
                    "public/css/style-fullscreen.min.css": "src/sass/theme-components/layouts/style-fullscreen.scss",
                    "public/css/style-horizontal.min.css": "src/sass/theme-components/layouts/style-horizontal.scss",
                    "public/css/custom.min.css": "src/sass/custom/custom.scss"
                }
            }
        },

        // PostCss Autoprefixer
        postcss: {
            options: {
                processors: [
                    require("autoprefixer")({
                        browsers: [
                            "last 2 versions",
                            "Chrome >= 30",
                            "Firefox >= 30",
                            "ie >= 10",
                            "Safari >= 8"
                        ]
                    })
                ]
            },
            main: {
                files: {
                    "public/css/materialize.css": "public/css/materialize.css",
                    "public/css/style.css": "public/css/style.css",
                    "public/css/style-fullscreen.css": "public/css/style-fullscreen.css",
                    "public/css/style-horizontal.css": "public/css/style-horizontal.css",
                    "public/css/custom.css": "public/css/custom.css"
                }
            },
        },

        //  Uglify
        uglify: {
            options: {
                // Use these options when debugging
                mangle: false,
                compress: false,
                // beautify: true

            },
            dist: {
                files: {
                    "public/js/materialize.min.js": "src/template/js/materialize.js",
                    "public/js/dashboard-ecommerce.min.js": "src/template/js/dashboard-ecommerce.js",
                    "public/js/plugins.min.js": "src/template/js/plugins.js",
                    "public/js/custom-script.min.js": "src/template/js/custom-script.js",
                }
            }
        },

        // Replace min css
        replace: {
            min: {
                src: ["views/**/*.html"],
                dest: "views/",
                replacements: [{
                    from: "/materialize.css",
                    to: "/materialize.min.css"
                },
                {
                    from: "/style.css",
                    to: "/style.min.css"
                },
                {
                    from: "/custom.css",
                    to: "/custom.min.css"
                },
                {
                    from: "/materialize.js",
                    to: "/materialize.min.js"
                },
                {
                    from: "/plugins.js",
                    to: "/plugins.min.js"
                }
                ]
            }
        },

        // Clean folder
        clean: {
            dist: {
                src: [
                    "public/css/",
                    "public/fonts/",
                    "public/images/",
                    "public/js/",
                    "public/vendors/"
                ]
            },
            temp: {
                src: ["temp/"]
            },
        },

        // Watch for any files changes
        watch: {
            sass: {
                files: ["src/sass/**/*"],
                tasks: ["sass-compile"],
                options: {
                    interrupt: false,
                    spawn: false,
                },
            },
            js: {
                files: ["src/template/js/**/*"],
                tasks: ["dist-js"],
                options: {
                    interrupt: false,
                    spawn: false,
                },
            }
        },

        prettify: {
            options: {
                "indent": 4,
                "indent_char": " ",
                "indent_scripts": "normal",
                "wrap_line_length": 0,
                "brace_style": "collapse",
                "preserve_newlines": true,
                "max_preserve_newlines": 1,
                "unformatted": [
                    "a",
                    "code",
                    "pre"
                ]
            },
            // Prettify a directory of files
            all: {
                expand: true,
                cwd: "src/views/html/",
                ext: ".html",
                src: ["**/*.html"],
                dest: "html/"
            },
        },

        // Concurrent
        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 10,
            },
            monitor: {
                tasks: ["watch:sass", "watch:js", "notify:watching"]
            },
        },

        // Notifications for task complition
        notify: {
            watching: {
                options: {
                    enabled: true,
                    message: "Watching Files!",
                    title: "Materialize Admin",
                    success: true,
                    duration: 1
                }
            },

            css: {
                options: {
                    enabled: true,
                    message: "Sass Compiled!",
                    title: "Materialize Admin",
                    success: true,
                    duration: 1
                }
            },

            js: {
                options: {
                    enabled: true,
                    message: "JavaScript Compiled!",
                    title: "Materialize Admin",
                    success: true,
                    duration: 1
                }
            }
        },

    })

    // load the tasks
    grunt.loadNpmTasks("grunt-contrib-watch")
    grunt.loadNpmTasks("grunt-contrib-copy")
    grunt.loadNpmTasks("grunt-sass")
    grunt.loadNpmTasks("grunt-contrib-concat")
    grunt.loadNpmTasks("grunt-contrib-uglify")
    grunt.loadNpmTasks("grunt-contrib-clean")
    grunt.loadNpmTasks("grunt-concurrent")
    grunt.loadNpmTasks("grunt-notify")
    grunt.loadNpmTasks("grunt-text-replace")
    grunt.loadNpmTasks("grunt-postcss")

    // define the tasks
    grunt.registerTask("dist", [
        "clean:dist",
        "dist-css",
        "dist-js",
        "copy",
        // "replace:min",
    ])

    grunt.registerTask("sass-compile", ["sass:main", "notify:css"])
    grunt.registerTask("dist-css", ["sass-compile", "postcss:main", "sass:dist", "notify:css"])
    grunt.registerTask("dist-js", ["uglify:dist", "notify:js"])
    grunt.registerTask("monitor", ["concurrent:monitor"])
    grunt.registerTask("default", ["monitor"])
}
