module.exports = (grunt) ->
  require("load-grunt-tasks") grunt
  tasks = require("load-grunt-configs")(grunt,
    config:
      src: [
        "grunt/*.coffee"
        "grunt/*.js"
      ]
    pkg: grunt.file.readJSON("package.json")
    now: new Date().getTime()
  )

  grunt.initConfig tasks

  # Default task
  grunt.registerTask "default", [
    "jshint"
    "compass"
    "copy"
    "requirejs"
    "processhtml"
  ]