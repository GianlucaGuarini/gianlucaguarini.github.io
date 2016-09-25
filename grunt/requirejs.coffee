amdclean = require 'amdclean'
fs = require 'fs'

module.exports = build:
  options:
    baseUrl: 'src/assets/js'
    out: './assets/js/build.min.js'
    mainConfigFile: 'src/assets/js/config.js'
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