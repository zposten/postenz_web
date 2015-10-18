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
           redirectTo: '/'
       });
}]);

WebsiteApp.controller('HomeController', function($scope) {
    $scope.message = 'This is the home screen';
    $scope.title = 'Zach Posten'
    $scope.subtitle = 'Sometimes I just want to give it all up and become a handsome billionaire.'
});

WebsiteApp.controller('ContactController', function($scope) {
    $scope.message = 'This is the controller screen';
    $scope.title = 'Contact Information'
    $scope.subtitle = 'How you\'ll reach me when you inevitably want to';
});

WebsiteApp.controller('BlogController', function($scope) {
    $scope.message = 'This is the blog screen';
    $scope.title = 'My Blog';
    $scope.subtitle = 'My most inner thoughts about public matters';
});



