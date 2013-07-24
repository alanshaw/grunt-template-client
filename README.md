# grunt-template-client [![Dependency Status](https://david-dm.org/alanshaw/grunt-template-client/status.png)](https://david-dm.org/alanshaw/grunt-template-client)

> Compile any and all templates into a ready to use script include.

## Getting Started
Install this [grunt][grunt] plugin next to your project's [Gruntfile.js][getting_started] with: `npm install grunt-template-client`

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

_Note: as of version 0.3.0 this plugin requires grunt 0.4. Install version 0.2.1 for grunt 0.3 support._

Then add this line to your project's `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-template-client');
```

## Example
given the following config and template
### config
```javascript
  templateclient: {
    dist: {
		options: {
			variable: 'window.tmpl',
			prefix: 'Hogan.compile(',
			suffix: ')'
		},
		src: ['templates/**/*.hogan'],
		dest: 'dist/tmpl.js' 
    }
  }
```
### templates
#### templates/item.hogan
```html
<li>
  <h2>{{title}}<h2>
  <p>{{text}}</p>
</li>
```
#### templates/list.hogan
```html
<ul id="a-list">
{{#items}}
  {{>item}}
{{/items}}
</ul>
```

will output the following script file
#### dist/tmpl.js
```javascript
(function compileTemplates() {
  window.tmpl=window.tmpl||{};
  tmpl.item=Hogan.compile('<li><h2>{{title}}</h2><p>{{text}}</p></li>');
  tmpl.list=Hogan.compile('<ul id="a-list">{{#items}}{{>item}}{{/items}}</ul>');
}());
```
ready to use/include/concat etc in your app like this.

```javascript
tmpl.list.render({ items: [] });
```

### Options

#### options.variable
Type: `String`
Default value: `tmpl`

The var attached to window that'll contain the compiled templates.

#### options.prefix
Type: `String`
Default value: `Hogan.compile(`

Code to output before each template content.

#### options.suffix
Type: `String`
Default value: `)`

Code to output after each template content.

#### options.key
Type: `Function`
Default value: `Template file name without extension`

Function returning `String` to use as the key for accessing the compiled template in `options.variable`. Passed the template file path as first param. Default is as follows:

```javascript
function(filepath) {
  return path.basename(filepath, path.extname(filepath));
}
```

#### options.val
Type: `Function`
Default value: `Function returning the template contents`

Function that generates a `String` that is used as the template value. By default this simply returns the template contents, but it could be used to return a compiled template. For example:

```javascript
grunt.initConfig({
    templateclient: {
      dist: {
        options: {
          prefix: 'new Hogan.Template(',
          suffix: ')',
          val: function (tpl) {
            return Hogan.compile(tpl, {asString: true});
          }
        },
        src: ['templates/*.hogan'],
        dest: 'dist/tpl.js'
      }
    }
});
```

## Todo
I guess there will be need to tweek the regex that cleans the template.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* 1.0.0 - Added `val` option to allow override of compiled template value
* 0.3.0 - Grunt 0.4 support
* 0.2.0 - Forked from https://github.com/ullmark/grunt-hogan-client to make generic.
* 0.1.1 - Initial release

## License
Copyright (c) 2012 Markus Ullmark  
Licensed under the MIT license.
