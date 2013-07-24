module.exports = function(grunt) {

  "use strict";

  // Project configuration.
  grunt.initConfig({

    templateclient: {
      namespaced: {
        options: {
          variable: 'foo.tmpl',
          prefix: 'new Ext.XTemplate(',
          suffix: ')'
        },
        src: ['test/templates/foo.hogan', 'test/templates/bar.hogan'],
        dest: 'test/tmp/namespaced.js'
      },
      val: {
        options: {
          prefix: 'new Hogan.Template(',
          suffix: ')',
          val: function (tpl) {
            // Mock Hogan
            var Hogan = {
              compile: function (tpl, opts) {
                return 'function(c,p,i){var _=this;_.b(i=i||"");_.b("please ");_.b(_.v(_.f("compile",c,p,0)));_.b(" me");return _.fl();;}';
              }
            };
            return Hogan.compile(tpl, {asString: true});
          }
        },
        src: 'test/templates/val.hogan',
        dest: 'test/tmp/val.js'
      },
      all: {
        src: ['test/templates/**/*.hogan'],
        dest: 'test/tmp/all.js'
      }
    },

    nodeunit: {
      files: ['test/template-client_test.js']
    },

    watch: {
      files: '<%= jshint.files %>',
      tasks: 'default'
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        globals: {
          Hogan: true,
          foo: true,
          window: true
        }
      },
      files: ['Gruntfile.js', 'tasks/**/*.js', 'test/template-client_test.js']
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bump');

  // Default task.
  grunt.registerTask('default', ['jshint', 'templateclient', 'nodeunit']);

};
