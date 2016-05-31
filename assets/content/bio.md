### Recent Work

Most recently, I have put a great deal of time into improving my web development skills, through creating this website. I created everything you see here using a variety of frameworks and libraries.

First and foremost, this site is built using Google's [Angular framework][angular]. Angular is exceptionally useful is so many different ways. A couple of my personal favorites are ui-routing and directives. [UI-routing][ui-router] is pervasive on this site. Every time the url changes, the site is put in a different state. UI-routing allows for the nesting of views, which is what I've used to create this single page application. Directives allow for convenient DRY code, so that the repetition of common snippets can be removed.

I'm using [Materialize][materialize] for a material, responsive design. I prefer the Materialize grid over the Bootstrap version because it doesn't require much text to be inserted into the markup. Take for example a column that should be a quarter of the page width on large screens, half on medium screens, and full screen on small screens:

```html
<div class="col-lg-3 col-md-6 col-sm-12"></div>
<div class="col l3 m6 s12"></div>
```

I count fourteen less characters in this small example, just think of the difference that makes to an entire application!  In addition to a concise grid system, Materialize provides a number of very useful web components that require little work on the developers part to use.  For example, take a look at my [blog][blog] you'll notice the prominent use of Materialize cards as a simple means of displaying options with images to the user.

I'm using [Compass][compass] for cleaner and more modular stylesheets with [SCSS][sass].  SCSS is AWESCSSOMEEE!! It's a language that gets transcompiled into readable CSS, but allows you to use variables! 

```scss
$primary-color: #2196F3;
$masthead-height: 50px;

.masthead {
    background-color: $primary-color;
    width: 100%;
    height: $masthead-height;
}

a {
    color: $primary-coor;
}
```

No more repeating the same color code over and over and having to change it in every place!  No more repeating various sizes and struggling to figure out if this 15px should also be adjusted because that first one was.  If you think that's cool, stay posted for my soon to be blog post on my favorite parts of Compass and SCSS.

To augment SCSS in a small but important way, I'm using Eduardo Boucas' fantastic [SCSS mixin][media-query] for simple and readable `@media` queries.  This little gem lets me write beautifully readable code like this:

```scss
header, main, footer {
  padding-left: 240px;

  @include media("<=tablet") {
    padding-left: 0;
  }
}
```

The first iteration of this website held all the text for the various pages inside of HTML pages.  This was fine and I didn't think much of it until I started to implement my blog.  I had never really written any "bloggy" content, apart from these weekly questions we had to write in my iOS course with [Dr. Sebern][sebern].  He had us write these weekly questions about topics that we had struggled with or looked into during the week, and they were to be written in markdown so that he could display them on his website.  I could have just copied the text over and changed the markdown syntax to HTML, but that sort of stuff annoys me.  I wanted a way to display these markdown files in their original state.  After several iterations, I came up with what you see on the [blog][blog] today, using [Remarkable][remarkable] for parcing markdown into HTML and [highlight.js][highlightjs] for beautiful syntax highlighting of code snippets like those you've seen on this page.

Additionally, although I am still not sure what the general practice is, I don't like writing content in HTML files.  It's bulky and takes the focus away from the content.  Because that is the precise problem that Markdown was written to combat, I'm also writing my content-heavy web pages (like this one) in markdown, and parcing it in a similar fashion to the blog posts.

Photography has become one of my hobbies over the last few years, and as part of my personal website I wanted to showcase photos that I've taken.  Originally I was planning on building a photo-viewer myself, but I decided that reinventing the wheel would only waste time and create something that's already been done better before.  So I did some searching, and I found [Photoswipe][photoswipe].  Photoswipe allows me to display my photos in a low quality grid (to shorten page load time), and when a user clicks on one, a higher quality version of that photo is shown in a [lightbox][lightbox] style.  The user is then able to use the arrow keys (or swipe) to see additional pictures in this full screen view.  It's also touch friendly which is very useful for mobile phones.  This can be seen in action in the [photos][photos] section of this here site.


[angular]: https://angularjs.org
[ui-router]: https://github.com/angular-ui/ui-router
[materialize]: http://materializecss.com
[compass]: http://compass-style.org
[sass]: http://sass-lang.com
[media-query]: https://css-tricks.com/approaches-media-queries-sass
[sebern]: http://seprof.sebern.com
[remarkable]: https://github.com/jonschlinkert/remarkable
[highlightjs]: https://highlightjs.org
[photoswipe]: http://photoswipe.com
[lightbox]: http://lokeshdhakar.com/projects/lightbox2

[blog]: #/blog/categories
[photos]: #/photos
