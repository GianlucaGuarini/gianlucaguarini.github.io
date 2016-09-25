module.exports = main:
  files: [
    {
      expand: true
      cwd: "src/assets"
      src: [
        "css/**"
      ]
      dest: "./assets"
    }
    {
      expand: true
      cwd: "src"
      src: ["*.!(json|rb|md|js)"]
      dest: "./"
      filter: "isFile"
    }
  ]