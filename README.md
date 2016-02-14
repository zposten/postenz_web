# Setup

1. Install Ruby using the [Ruby Installer](http://rubyinstaller.org/)
1. Add the Ruby bin folder to your path.  
	1. This is likely `C:\Ruby22-x64\bin`
1. Ensure it's up to date (it should be, you just installed it)
	`$ gem update --system`
1. Install compass
	`$ gem install compass`
1. The SCSS files are then transcompiled into CSS files by running `$ compass compile` from the `src` directory