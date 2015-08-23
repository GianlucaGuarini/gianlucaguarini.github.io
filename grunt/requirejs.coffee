amdclean = require 'amdclean'
fs = require 'fs'

module.exports = build:
  options:
    baseUrl: 'app/assets/js'
    out: 'dist/assets/js/build.min.js'
    mainConfigFile: 'app/assets/js/config.js'
    name: 'main'
    optimize: 'uglify2'
    insertRequire: ['main']
    skipModuleInsertion: true
    wrap: true
    preserveLicenseComments: false
    findNestedDependencies:true
    onModuleBundleComplete: (data) ->
      outputFile = data.path
      fs.writeFileSync outputFile, amdclean.clean(
          filePath: outputFile
          transformAMDChecks: false
      )