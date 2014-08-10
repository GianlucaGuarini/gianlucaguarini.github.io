module.exports = main:
  files: [
    {
      expand: true
      cwd: "app/assets"
      src: [
        "css/**"
        "vendor/**"
        "!vendor/bower"
      ]
      dest: "dist/assets"
    }
    {
      expand: true
      cwd: "app"
      src: ["*.!(json|rb|md|js)"]
      dest: "dist"
      filter: "isFile"
    }
  ]