(function compileTemplates() {
	window.tmpl=window.tmpl||{};
	tmpl['bar']=Hogan.compile('<div class="something"><ul>{{#foo}}<li><h1>{{bar}}</h1></li>{{/foo}}</ul></div>');
	tmpl['foo']=Hogan.compile('<div class="something"><ul>{{#foo}}<li><h1>{{bar}}</h1></li>{{/foo}}</ul></div>');
	tmpl['val']=Hogan.compile('please {{compile}} me');
}());
