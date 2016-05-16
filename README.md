## Setup

1. Set up Compass on your computer
	1. Install Ruby on your computer using the [Ruby Installer](http://rubyinstaller.org/)
	1. Add the Ruby bin folder to your `PATH`.  
		1. This is likely `C:\RubyXX-x64\bin`
		1. You will have to open a new terminal and possibly restart your computer after making changes to your path.
	1. Ensure it's up to date 
		`$ gem update --system`
	1. Install compass
		`$ gem install compass`
1. If you don't already have it, install [Node](https://nodejs.org/en/download/)
1. Install bower and bower components 
	1. `$ npm install bower -g`
	1. Run `bower install` from the root directory of the project
1. Install the [Coffeescript](http://coffeescript.org/) compiler
	`$ npm install -g coffee-script`

## Transcompilation

The SCSS files can be transcompiled into CSS files by running `$ compass compile` from the root directory of the project (as specified by the `config.rb` file).

### WebStorm File Watchers
File watchers can be configured in WebStorm to automatically transcompile coffee files to javascript files and scss files to css files.

1. Open settings in WebStorm (`File > Settings` or `Ctrl+Alt+S`)
1. Navigate to `Tools > File Watchers`
1. Click the '+' icon to add file watchers for SASS and CoffeeScript with the following settings:
	1. [SASS](https://www.jetbrains.com/phpstorm/help/working-with-sass-and-scss-in-compass-projects.html):
		1. **File type:**  SCSS
		1. **Scope:**:  Project Files
		1. **Program:**  `C:\RubyXX-x64\bin\compass.bat`
		1. **Arguments:**  `compile $UnixSeparators($ProjectFileDir$\)$`
		1. **Working directory:**  `$FileDir$`
	1. [CoffeeScript](https://www.jetbrains.com/webstorm/help/transpiling-coffeescript-to-javascript.html):
		1. **File type:**  CoffeeScript
		1. **Scope:**:  Project Files
		1. **Program:**  `C:\Users\USER\AppData\Roaming\npm\coffee.cmd`
		1. **Arguments:**  `--output $ProjectFileDir$\src\javascript --map --compile $FileName$ `
		1. **Working directory:**  `$FileDir$`
		1. **Output paths to refresh:**  (combine the following with no spaces)
			`$FileNameWithoutExtension$.js`
			`:$FileNameWithoutExtension$.map`
			`:$FileNameWithoutExtension$.js.map`
			`:$FileNameWithoutExtension$.map`
			`:$FileNameWithoutExtension$.js.map`