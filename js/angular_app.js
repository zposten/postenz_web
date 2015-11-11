var app = angular.module('WebsiteApp', ['ui.router']); //['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
   $routeProvider
       .when('/', {
           controller: 'HomeController',
           templateUrl: 'views/home.html'
       })
       .when('/contact', {
           controller: 'ContactController',
           templateUrl: 'views/contact.html'
       })
       .when('/blog', {
           controller: 'BlogController',
           templateUrl: 'views/blog.html'
       })
       .when('/blog/ios/1', {
            controller: 'BlogController',
            templateUrl: 'views/ios_posts/one.html'
        })
       .when('/blog/ios/2', {
           controller: 'BlogController',
           templateUrl: 'views/ios_posts/two.html'
       })
       .otherwise({
           redirectTo: '/'
       });
}]);

app.controller('HomeController', function($scope) {
    $scope.message = 'This is the home screen';
    $scope.title = 'Zach Posten'
    $scope.subtitle = 'Sometimes I just want to give it all up and become a handsome billionaire.'
});

app.controller('ContactController', function($scope) {
    $scope.message = 'This is the controller screen';
    $scope.title = 'Contact Information'
    $scope.subtitle = 'How you\'ll reach me when you inevitably want to';
});

app.controller('BlogController', function($scope) {
    $scope.message = 'This is the blog screen';
    $scope.title = 'The Blog';
    $scope.subtitle = 'Real men do blog, and so do I';

    //var content = util.readTextFile('assets/ios_posts/se4910i-postenz-question-001.md');
    //$scope.post = '<markdown>### Questions \n1. </markdown>';

    //alert($('#ios1').innerHTML);
    //$('#ios1').innerHTML = util.readTextFile('assets/ios_posts/se4910i-postenz-question-001.md');
    //$('#ios1').innerHTML = '<markdown>##title</markdown>';
});


app.directive('markdown', function($window) {
    var converter = new $window.Showdown.converter();
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var htmlText = converter.makeHtml(element.text());
            element.html(htmlText);
        }
    }
});


//app.directive('ios', function() {
//    return {
//        restrict: 'E',
//        link: function(scope, element, attrs) {
//            alert("link!!");
//        },
//        templateUrl: function(elem,attrs) {
//            return attrs.templateUrl || 'views/contact.html';
//        }
//    }
//});



//app.directive("ios", function () {
//    return function (scope, element, attrs) {
//        scope.$watch("assignments", function (value) {//I change here
//            var val = value || null;
//            if (val)
//                element.dataTable({"bDestroy": true});
//        });
//    };
//});
