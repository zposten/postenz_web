## Setup

1. Install Ruby using the [Ruby Installer](http://rubyinstaller.org/)
1. Add the Ruby bin folder to your path.  
	1. This is likely `C:\Ruby22-x64\bin`
1. Ensure it's up to date (it should be, you just installed it)
	`$ gem update --system`
1. Install compass
	`$ gem install compass`

## Transcompilation

The SCSS files can be transcompiled into CSS files by running `$ compass compile` from the `src` directory

### WebStorm File Watchers
File watchers can be configured in WebStorm to automatically transcompile coffee files to javascript files and scss files to css files.

1. Open settings in WebStorm (`File > Settings` or `Ctrl+Alt+s`)
1. Navigate to `Tools > File Watchers`
1. Click the '+' icon to add file watchers for SASS and CoffeeScript with the following settings:
	1. [SASS](https://www.jetbrains.com/phpstorm/help/working-with-sass-and-scss-in-compass-projects.html):
		1. **File type:**  SCSS
		1. **Scope:**:  Project Files
		1. **Program:**  `C:\Ruby22-x64\bin\compass.bat`
		1. **Arguments:**  `compile $UnixSeparators($ProjectFileDir$\src)$`
		1. **Working directory:**  `$FileDir$`
	1. CoffeeScript:
		1. **File type:**  CoffeeScript
		1. **Scope:**:  Project Files
		1. **Program:**  `C:\Users\zpost\AppData\Roaming\npm\coffee.cmd`
		1. **Arguments:**  `--output $ProjectFileDir$\src\javascript --map --compile $FileName$ `
		1. **Working directory:**  `$FileDir$`
		1. **Output paths to refresh:**  `$FileNameWithoutExtension$.js:$FileNameWithoutExtension$.map:$FileNameWithoutExtension$.js.map:$FileNameWithoutExtension$.map:$FileNameWithoutExtension$.js.map`