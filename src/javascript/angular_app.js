var app = angular.module('WebsiteApp', ['ui.router']); //['ngRoute']);

app.config(function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, send to /home
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: function ($scope) {
                $scope.title = 'Zach Posten'
                $scope.subtitle = 'Sometimes I just want to give it all up and become a handsome billionaire.'

                highlightSelectedNav('nav-home');
            }
        })

        .state('bio', {
            url: '/bio',
            templateUrl: 'views/bio.html',
            controller: function ($scope) {
                $scope.title = 'My Bio';
                $scope.subtitle = 'A head-first dash toward an unrealistic goal.';
            }
        })

        .state('contact', {
            url: '/contact',
            templateUrl: "views/contact.html",
            controller: function ($scope) {
                $scope.title = 'Contact Information'
                $scope.subtitle = 'How you\'ll reach me when you inevitably want to';

                highlightSelectedNav('nav-contact');
            }
        })

        .state('blog', {
            url: "/blog",
            templateUrl: "views/blog.html",
            controller: function ($scope, $sce) {
                $scope.title = 'The Blog';
                $scope.subtitle = $sce.trustAsHtml('I will be updating this page in the <strike ng-bind-html>near</strike> future, I promise');

                highlightSelectedNav('nav-blog');
                addPagerClickListeners();
            }
        })

        .state('blog.post', {
            url: '/{blogPostId}',
            templateUrl: function (params) {
                return 'views/blog_posts/' + params.blogPostId + '.html';
            }
        })

        .state('photos', {
            url: '/photos',
            templateUrl: 'views/photos.html',
            controller: function ($scope) {

                $scope.title = 'Posten Photography';
                $scope.subtitle = 'I have taken at least one good photo';
                $scope.photos = photoswipe.photos;

                highlightSelectedNav('nav-photos');
            }
        })

        .state('apps', {
            url: '/apps',
            templateUrl: 'views/apps.html',
            controller: function ($scope) {

                $scope.title = 'Applets';
                $scope.description = 'In the little free time that I do have, I don\'t always like to spend it' +
                    ' programming because, well,  that\'s what I do all day.  Sometimes though, I get started on' +
                    ' something' +
                    ' and become engrossed in the project until it\'s complete.  Below are examples of those times.';
                $scope.days = ['M', 'T', 'W', 'R', 'F'];

                highlightSelectedNav('nav-apps');
            }
        })

        .state('iir', {
            url: '/isItRacist',
            templateUrl: 'views/iir.html',
            controller: function ($scope) {
                $scope.title = 'Does the internet think it\'s racist?';
                $scope.description = 'This applet crawls the appropriate parts of the internet and determines it\'s' +
                    ' collective opinion through textual analysis.  The results do not reflect my own beliefs in any way.';
            }
        })

        .state('scheduler', {
            url: '/scheduler',
            templateUrl: 'views/scheduler.html',
            controller: function($scope) {
                $scope.title = 'Class Scheduler';
                $scope.description = 'MSOE has a very useful scheduling application that students can make use of' +
                    ' of when choosing their classes each quarter.  Other schools aren\'t quite' +
                    ' so lucky though and have to go through this tedious process of finding possible schedules' +
                    ' manually.  To help with this, I have implemented a scheduling application that any student at' +
                    ' any university should be able to make use of.'
            }
        })


});


app.directive('markdown', function ($window) {
    var converter = new $window.Showdown.converter();
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var htmlText = converter.makeHtml(element.text());
            element.html(htmlText);
        }
    }
});


app.directive('photoswipe', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'EA',
        templateUrl: 'views/gallery.html',
        link: function (scope, elem, attrs) {
            //attrs references any attributes on the directive element in html
            //elem is the actual DOM element of the directive,so you can bind it with jQuery

            photoswipe.init('.demo-gallery');
        }
    };
}]);

app.directive('selectTime', function () {
    return {
        templateUrl: 'views/select-time.html'
    };
});