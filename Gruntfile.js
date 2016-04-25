module.exports = function(grunt){
	grunt.initConfig({
	  concat: {
	    clientjs: {
	      src: ['js/client/app.js','js/client/routes.js'],
	      dest: 'build/js/client/scripts.js',
	    },
	    css: {
	   	  src: ['css/bootstrap.min.css','css/style.css',],
	   	  dest: 'build/css/styles.css',
	    },
	  },


	 cssmin: {
	  target: {
	    files: [{
	      expand: true,
	      cwd: 'build/css',
	      src: ['*.css', '!*.min.css'],
	      dest: 'build/css',
	      ext: '.min.css'
	    }]
	  },
	},

	uglify: {
	    options: {
	      mangle: false
	    },
	    uglifyjs: {
	      files: {
	        'build/js/output.min.js': ['build/js/client/scripts.js']
	      }
	    }
	  },

	watch: {
	  clientjs: {
	    files: ['js/client/**/*.js'],
	    tasks: ['concat:clientjs'],
	    },
      css: {
	    files: ['css/**/*.css'],
	    tasks: ['concat:css'],
	    },
	  },

});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['concat','cssmin','uglify','watch']);

};