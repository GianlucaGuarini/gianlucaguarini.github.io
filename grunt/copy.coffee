module.exports = main:
  files: [
    {
      expand: true
      cwd: "app/assets"
      src: [
        "css/**"
      ]
      dest: "./assets"
    }
    {
      expand: true
      cwd: "app"
      src: ["*.!(json|rb|md|js)"]
      dest: "./"
      filter: "isFile"
    }
  ]