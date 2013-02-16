/*
 * grunt-hogan-client
 * https://github.com/markus.ullmark/grunt-hogan-client
 *
 * Copyright (c) 2012 Markus Ullmark
 * Licensed under the MIT license.
 */
var path = require('path');

module.exports = function(grunt) {
	
	"use strict";
	
	var templateClient = require('./helper/template-client');
	
	grunt.registerMultiTask('templateclient', 'prepares and combines any type of template into a script include', function() {
		
		var options = this.options({
			variable: 'tmpl',
			key: function(filepath) {
				return path.basename(filepath, path.extname(filepath));
			},
			prefix: 'Hogan.compile(',
			suffix: ')'
		});
		
		this.files.forEach(function(srcDest) {
			
			// create the hogan include
			var src = templateClient(srcDest.src, options, grunt);
			
			// write the new file
			grunt.file.write(srcDest.dest, src);
			
			// log our success
			grunt.log.writeln('File "' + srcDest.dest + '" created.');
		});
	});
};
