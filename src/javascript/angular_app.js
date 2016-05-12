var app = angular.module('WebsiteApp', ['ui.router']); //['ngRoute']);

app.config(function ($stateProvider, $urlRouterProvider) {
  
  // Send any unmatched paths to /home
  $urlRouterProvider.otherwise("/home");
  
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'src/views/home.html',
    controller: function ($scope) {
      highlightSelectedNav('nav-home');
      $scope.title = 'Zach Posten';
      $scope.subtitle = 'Sometimes I just want to give it all up and become a handsome billionaire.';
      $scope.resumeUrl = 'https://drive.google.com/open?id=0B1UtegqS9PrTNjQ5TEQteGdqeWM';
    }
  });
  
  $stateProvider.state('bio', {
    url: '/bio',
    templateUrl: 'src/views/bio.html',
    controller: function ($scope) {
      highlightSelectedNav('nav-home');
      $scope.title = 'My Bio';
      $scope.subtitle = 'A head-first dash toward an unrealistic goal.';
    }
  });
  
  $stateProvider.state('contact', {
    url: '/contact',
    templateUrl: "src/views/contact.html",
    controller: function ($scope) {
      highlightSelectedNav('nav-contact');
      $scope.title = 'Contact Information';
      $scope.subtitle = 'How you\'ll reach me when you inevitably want to';
    }
  });
  
  $stateProvider.state('photos', {
    url: '/photos',
    templateUrl: 'src/views/photos.html',
    controller: function ($scope) {
      highlightSelectedNav('nav-photos');
      $scope.title = 'Posten Photography';
      $scope.subtitle = 'I have taken at least one good photo';
      $scope.photos = photoswipe.photos;
    }
  });
  
  $stateProvider.state('apps', {
    url: '/apps',
    templateUrl: 'src/views/apps.html',
    controller: function ($scope) {
      highlightSelectedNav('nav-apps');
      $scope.title = 'Applets';
      $scope.description = 'In the little free time that I do have, I don\'t always' +
        ' like to spend itprogramming because, well,  that\'s what I do all day.' +
        ' Sometimes though, I get started on something and become engrossed in' +
        ' the project until it\'s complete.  Below are examples of those times.';
    }
  });
  
  $stateProvider.state('iir', {
    url: '/apps/isItRacist',
    templateUrl: 'src/views/iir.html',
    controller: function ($scope) {
      highlightSelectedNav('nav-apps');
      $scope.title = 'Does the internet think it\'s racist?';
      $scope.description = 'This applet crawls the appropriate parts of the internet' +
        ' and determines it\'s collective opinion through textual analysis.' +
        ' The results do not reflect my own beliefs in any way.';
    }
  });
  
  $stateProvider.state('scheduler', {
    url: '/apps/scheduler',
    templateUrl: 'src/views/scheduler/scheduler.html',
    controller: function ($scope) {
      highlightSelectedNav('nav-apps');
      $scope.title = 'Class Scheduler';
      $scope.description = 'MSOE has a very useful scheduling application that students' +
        ' can make use of when choosing their classes each quarter.  Other schools' +
        ' aren\'t quite so lucky though and have to go through this tedious process' +
        ' of finding possible schedules manually.  To help with this, I have implemented' +
        ' a scheduling application that any student at any university should be able to make use of.';
      $scope.days = ['M', 'T', 'W', 'R', 'F'];
      $scope.hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      $scope.mins = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
    }
  });
  
  $stateProvider.state('blog', {
    url: "/blog",
    templateUrl: "src/views/blog/blog.html",
    controller: function ($scope, $sce, $state) {
      highlightSelectedNav('nav-blog');
      $('.description').hide();
      
      $scope.title = 'The Blog';
      $scope.subtitle = 'I will be updating this page soon';
      $scope.categories = [{list: 'ios', title: 'iOS posts'}];
      $scope.ios = [
        'iOS UI Creation Methods',
        'Break Statements',
        'Hash Symbol',
        'Static Data Storage',
        'UI Popover Controller',
        'Transfer Delegate Selection to Parent',
        'Variable Initialization'
      ];
      
      addPagerClickListeners();
    }
  });
  
  $stateProvider.state('blog.categories', {
    url: '/categories',
    templateUrl: 'src/views/blog/blog-categories.html'
  });
  
  $stateProvider.state('blog.list', {
    url: '/{list}',
    template: '<ul id="blog-list" class="z-bubble"></ul>',
    controller: function ($scope, $stateParams) {
      var items = $scope.$parent[$stateParams.list];
      
      var html = '';
      for (var i = 0; i < items.length; ++i) {
        var url = '#/blog/item/' + $stateParams.list + '/' + i;
        var tag = '<li><a href="{0}">{1}</a></li>\n';
        html += tag.format(url, items[i]);
      }
      
      $('#blog-list').html(html);
    }
  });
  
  $stateProvider.state('blog.post', {
    url: '/item/{list}/{blogPostId}',
    template: function () {
      return '<div markdown id="blogpost" class="blogpost"></markdown>';
    },
    controller: function ($scope, $stateParams, $window) {
      var url = 'assets/blog-posts/{0}/blog{1}.md';
      url = url.format($stateParams.list, $stateParams.blogPostId);
      util.insertMarkdown(url, '#blogpost');
    }
  });
  
  $stateProvider.state('recipes', {
    url: '/blog/recipes',
    templateUrl: "src/views/blog/blog.html",
    controller: function ($scope, $state) {
      highlightSelectedNav('nav-blog');
      $('.subtitle').hide();
      
      $scope.title = 'Not So Fancy Foods';
      $scope.description = 'I\'m not much of a cook, but I love to eat.  I will be filling' +
        ' this page with recipes that I\'ve tried and particularly enjoyed.  This is as' +
        ' much for my reference as anyone else\'s, but please do try your hand and let me' +
        ' know what you think!';
      $scope.meals = [
        {meal: 'breakfast', title: 'Breakfast'},
        {meal: 'dinner', title: 'Not Breakfast'}
      ];
      $scope.recipes_dinner = [
        {name: 'chicken-and-rice', title: 'Mom\'s Chicken and Rice'},
        {name: 'one-pot-taco-pasta', title: 'One Pot Taco Pasta'},
        {name: 'goulash', title: 'American Goulash'},
        {name: 'bbq-chicken', title: 'Crockpot BBQ Chicken'},
        {name: 'pizza', title: 'Johnny\'s Hommade Pizza'}
      ];
      $scope.recipes_breakfast = [
        {name: 'omelet', title: 'Mom\'s Omlets'},
        {name: 'french-toast', title: 'Scotty\'s French Toast'}
      ];
    }
  });
  
  $stateProvider.state('recipes.meals', {
    url: '/meals',
    templateUrl: 'src/views/blog/meals.html'
  });
  
  $stateProvider.state('recipes.meal', {
    url: '/meals/{meal}',
    template: '<ul id="recipes" class="z-bubble"></ul>',
    controller: function ($scope, $stateParams, $compile) {
      var html = '';
      var recipes = $scope.$parent['recipes_' + $stateParams.meal];
      
      for (var i = 0; i < recipes.length; ++i) {
        var item = '<li><a href="#/blog/recipes/meals/{0}/{1}">{2}</a></li>';
        item = item.format($stateParams.meal, recipes[i].name, recipes[i].title);
        html += item;
      }
      
      $('#recipes').html(html);
    }
  });
  
  $stateProvider.state('recipes.recipe', {
    url: '/meals/{meal}/{name}',
    template: '<div markdown id="recipe" class="blogpost"></markdown>',
    controller: function ($scope, $stateParams) {
      var url = 'assets/recipes/recipe-' + $stateParams.name + '.md';
      util.insertMarkdown(url, '#recipe');
    }
  })
});


/***********************************************************
 * DIRECTIVES 
 **********************************************************/


app.directive('toggle', function () {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'src/views/controls/toggle.html',
    link: function (scope, elem, attrs) {
      $('#toggle').on('click', function () {
        $(this).toggleClass("on");
        $('#page-wrapper').toggleClass('toggled');
      });
    }
  }
});

app.directive('schdCourse', function () {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'src/views/scheduler/schd-course.html'
  }
});

app.directive('selectTime', function () {
  return {
    templateUrl: 'src/views/scheduler/select-time.html',
    link: function (scope, elem, attrs) {
      window.SchedulerInput.init();
    }
  };
});


app.directive('photoswipe', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'AE',
    templateUrl: 'src/views/gallery.html',
    link: function (scope, elem, attrs) {
      //attrs references any attributes on the directive element in html
      //elem is the actual DOM element of the directive,so you can bind it with jQuery
      
      photoswipe.init('.demo-gallery');
    }
  };
}]);
