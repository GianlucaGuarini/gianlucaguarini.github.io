module.exports =
  js:
    files: ["app/assets/js/**/*.js"]
    tasks: ["jshint"]

  css:
    files: ["app/assets/scss/**/*.scss"]
    tasks: ["compass"]