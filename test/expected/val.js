(function compileTemplates() {
	window.tmpl=window.tmpl||{};
	tmpl['val']=new Hogan.Template('function(c,p,i){var _=this;_.b(i=i||"");_.b("please ");_.b(_.v(_.f("compile",c,p,0)));_.b(" me");return _.fl();;}');
}());
