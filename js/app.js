var app = angular.module('WebsiteApp', []); //['ngRoute']);

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
           templateUrl: 'views/ios_posts.html'
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
    $scope.title = 'My Blog';
    $scope.subtitle = 'My most inner thoughts about public matters';
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


