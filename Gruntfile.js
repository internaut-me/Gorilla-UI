module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
	less: {
		development: {
			options: {
			    paths: ["client/public/css/less/"]
			},
			files: {
			    "client/public/css/guerilla.css": "client/public/css/less/styles.less"
			}
		}
	},
	watch: {
		less: {
			
		}
	}
	});

	// Load packages
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default tasks
	grunt.registerTask('default', [
		'less',
		'watch'
	]);

};