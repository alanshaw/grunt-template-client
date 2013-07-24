(function compileTemplates() {
	window.foo=window.foo||{};
	window.foo.tmpl=window.foo.tmpl||{};
	foo.tmpl['foo']=new Ext.XTemplate('<div class="something"><ul>{{#foo}}<li><h1>{{bar}}</h1></li>{{/foo}}</ul></div>');
	foo.tmpl['bar']=new Ext.XTemplate('<div class="something"><ul>{{#foo}}<li><h1>{{bar}}</h1></li>{{/foo}}</ul></div>');
}());
