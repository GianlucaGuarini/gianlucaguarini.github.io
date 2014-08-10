module.exports = main:
  files: [
    {
      expand: true
      cwd: "app/assets"
      src: [
        "css/**"
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