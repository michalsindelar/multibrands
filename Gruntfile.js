var fs = require('fs')

const DIST_PATH = './dist/'
const BRANDS_FOLDER = './brands'

module.exports = function (grunt) {

   grunt.loadNpmTasks('grunt-contrib-watch')
   grunt.loadNpmTasks('grunt-contrib-stylus')

    grunt.initConfig({

        // Browser Sync
        browserSync: {
            dev: {
                bsFiles: {
                    src: 'css/screen.css'
                },
                options: {
                    proxy: './'
                }
            }
        },

        // Watch stylus changes
        watch: {
            cwd: 'css',
            files: ['styles/main.styl', 'styles/**/*.styl'],
            tasks: ['stylus:compile']
        },

        // Compiles stylus
        stylus: {
           options: {
              compress: false,
              'include css': true,
              rawDefine: true
           },
            compile: {
               paths: [
                  'node_modules/grunt-contrib-stylus/node_modules'
               ],
               files: [{
                  src: ['styles/main.styl'],
                  dest: '<%= grunt.config.get("distPath") %><%= grunt.config.get("brand") %>.css'
               }]
            }
        }

    });


   grunt.registerTask('setRuntime', function (brand) {
      var colors = JSON.parse(fs.readFileSync('./brands/' + brand + '.json'))['theme']['stylus-vars']

      grunt.config.set('brand', brand)
      return grunt.config.set('stylus.options.define', {
         brand: brand,
         theme: colors
      })
   })

   grunt.registerTask('compileStyles', function () {

      var done = this.async()
      fs.readdir(BRANDS_FOLDER, function (err, brands) {
         if (err) throw err

         brands.forEach(function (brand) {
            grunt.task.run(['setRuntime:' + brand.replace('.json', ''), 'stylus'])
         })

         done()
      })

   })

   grunt.registerTask('build', function () {
      grunt.config.set('distPath', DIST_PATH)
      grunt.task.run(['compileStyles'])
   })
}