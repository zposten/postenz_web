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

app.directive('schdSession', function () {
  return {
    templateUrl: 'src/views/scheduler/schd-session.html',
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

app.directive('zNav', function () {
  return {
    templateUrl: 'src/views/z-nav.html',
    link: function (scope, elem, attrs) {
      $('.button-collapse').sideNav();
    }
  }
});

app.directive('card', function () {
  return {
    templateUrl: 'src/views/controls/card.html',
    scope: {
      size: "@",
      items: "=",
      cols: "@",
      state: "@"
    }
  }
});
