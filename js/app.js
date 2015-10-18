var WebsiteApp = angular.module('WebsiteApp', []); //['ngRoute']);

WebsiteApp.config(['$routeProvider', function($routeProvider) {
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
       .otherwise({
           redirectTo: '/blog'
       });
}]);

WebsiteApp.controller('HomeController', function($scope) {
    $scope.message = 'This is the home screen';
});

WebsiteApp.controller('ContactController', function($scope) {
    $scope.message = 'This is the controller screen';
});

WebsiteApp.controller('BlogController', function($scope) {
    $scope.message = 'This is the blog screen';
});



