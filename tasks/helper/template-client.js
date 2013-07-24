module.exports = function(files, options, grunt) {
	
	"use strict";
	
	var cleaner = /^\s+|\s+$|[\r\n]+/gm;
	var js = '';
	
	options.variable = options.variable.replace('window.', '');
	
	js += '(function compileTemplates() {' + grunt.util.linefeed;
	
	var currentVar = 'window';
	var variables = options.variable.split('.');
	
	variables.forEach(function(v) {
		currentVar = currentVar + '.' + v;
		js += '	' + currentVar + '=' + currentVar + '||{};' + grunt.util.linefeed;
	});
	
	files.map(function(filepath) {
		
		var key = options.key(filepath);
		var contents = grunt.file.read(filepath);
		var val = options.val(contents).replace(cleaner, '').replace(/'/g, "\\'");
		
		js += '	' + options.variable + "['" + key + "']=" + options.prefix + "'" + val + "'" + options.suffix + ';' + grunt.util.linefeed;
	});

	js += '}());' + grunt.util.linefeed;

	return js;
};