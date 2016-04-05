var app = angular.module('WebsiteApp', ['ui.router']); //['ngRoute']);

app.config(function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, send to /home
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'src/views/home.html',
            controller: function ($scope) {
                $scope.title = 'Zach Posten'
                $scope.subtitle = 'Sometimes I just want to give it all up and become a handsome billionaire.'

                highlightSelectedNav('nav-home');
            }
        })

        .state('bio', {
            url: '/bio',
            templateUrl: 'src/views/bio.html',
            controller: function ($scope) {
                $scope.title = 'My Bio';
                $scope.subtitle = 'A head-first dash toward an unrealistic goal.';
            }
        })

        .state('contact', {
            url: '/contact',
            templateUrl: "src/views/contact.html",
            controller: function ($scope) {
                $scope.title = 'Contact Information'
                $scope.subtitle = 'How you\'ll reach me when you inevitably want to';

                highlightSelectedNav('nav-contact');
            }
        })

        .state('blog', {
            url: "/blog",
            templateUrl: "src/views/blog.html",
            controller: function ($scope, $sce) {
                $scope.title = 'The Blog';
                $scope.subtitle = $sce.trustAsHtml('I will be updating this page in the <strike ng-bind-html>near</strike> future, I promise');

                highlightSelectedNav('nav-blog');
                addPagerClickListeners();
            }
        })

        .state('blog.post', {
            url: '/{blogPostId}',
            template: function () {return '<markdown id="blogpost"></markdown>';},
            controller: function($scope, $stateParams, $window) {
                var url = 'http://poste.nz/assets/blog-posts/blog' + $stateParams.blogPostId + '.md';
                util.insertMarkdown(url, 'markdown#blogpost');
            }
        })

        .state('photos', {
            url: '/photos',
            templateUrl: 'src/views/photos.html',
            controller: function ($scope) {

                $scope.title = 'Posten Photography';
                $scope.subtitle = 'I have taken at least one good photo';
                $scope.photos = photoswipe.photos;

                highlightSelectedNav('nav-photos');
            }
        })

        .state('apps', {
            url: '/apps',
            templateUrl: 'src/views/apps.html',
            controller: function ($scope) {
                highlightSelectedNav('nav-apps');
                $scope.title = 'Applets';
                $scope.description = 'In the little free time that I do have, I don\'t always like to spend it' +
                    ' programming because, well,  that\'s what I do all day.  Sometimes though, I get started on' +
                    ' something' +
                    ' and become engrossed in the project until it\'s complete.  Below are examples of those times.';
            }
        })

        .state('iir', {
            url: '/apps/isItRacist',
            templateUrl: 'src/views/iir.html',
            controller: function ($scope) {
                highlightSelectedNav('nav-apps');
                $scope.title = 'Does the internet think it\'s racist?';
                $scope.description = 'This applet crawls the appropriate parts of the internet and determines it\'s' +
                    ' collective opinion through textual analysis.  The results do not reflect my own beliefs in any way.';
            }
        })

        .state('scheduler', {
            url: '/apps/scheduler',
            templateUrl: 'src/views/scheduler/scheduler.html',
            controller: function ($scope) {
                highlightSelectedNav('nav-apps');
                $scope.title = 'Class Scheduler';
                $scope.description = 'MSOE has a very useful scheduling application that students can make use of' +
                    ' of when choosing their classes each quarter.  Other schools aren\'t quite' +
                    ' so lucky though and have to go through this tedious process of finding possible schedules' +
                    ' manually.  To help with this, I have implemented a scheduling application that any student at' +
                    ' any university should be able to make use of.'
                $scope.init = function () {
                    $scope.days = ['M', 'T', 'W', 'R', 'F'];
                    $scope.hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                    $scope.mins = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
                };
                $('.schd-course').ready(window.SchedulerInput.init());
            }
        })

        .state('recipes', {
            url: '/recipes',
            templateUrl: 'src/views/recipes.html',
            controller: function($scope) {
                highlightSelectedNav('nav-blog');
                $scope.title = 'Not So Fancy Foods';
                $scope.description = "I'm not much of a cook, but I love to eat.  I will be filling this page with" +
                    " recipes that I've tried and particularly enjoyed.  This is as much for my reference as anyone" +
                    " else's, but please do try your hand and let me know what you think!";
            }
        })

        .state('recipes.recipe', {
            url: '/{recipeName}',
            template: function () {return '<markdown id="recipe"></markdown>';},
            controller: function($scope, $stateParams, $window) {
                var url = 'http://poste.nz/assets/recipes/recipe-' + $stateParams.recipeName + '.md';
                util.insertMarkdown(url, 'markdown#recipe');
            }
        })
});


app.directive('markdown', function ($window) {
    var converter = new $window.showdown.Converter();
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var markdownText = element.text();
            var htmlText = converter.makeHtml(markdownText);
            element.html(htmlText);
        }
    }
});

app.directive('floatInput', function(){
    return{
        restrict: 'AE',
        replace: true,
        templateUrl: 'src/views/controls/float-input.html',
        link: function(scope, elem, attrs){
            var hint = attrs.hint || attrs.label || attrs.placeholder;
            $(elem.find('.float-input-lbl')[0]).text(hint);
            elem.find('*').addClass(attrs.class);
            elem.find('*').removeClass('float-input-group');
            // if(attrs.width) elem.css('width', attrs.width);
        }
    }
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


app.directive('schdCourse', function () {
    return {templateUrl: 'src/views/scheduler/schd-course.html'};
});
app.directive('selectTime', function () {
    return {templateUrl: 'src/views/scheduler/select-time.html'};
});