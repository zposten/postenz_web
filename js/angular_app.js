var app = angular.module('WebsiteApp', ['ui.router']); //['ngRoute']);

app.config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "views/home.html",
            controller: function($scope) {
                $scope.title = 'Zach Posten'
                $scope.subtitle = 'Sometimes I just want to give it all up and become a handsome billionaire.'
            }
        })

        .state('contact', {
            url: "/contact",
            templateUrl: "views/contact.html",
            controller: function($scope) {
                $scope.title = 'Contact Information'
                $scope.subtitle = 'How you\'ll reach me when you inevitably want to';
            }
        })

        .state('blog', {
            url: "/blog",
            templateUrl: "views/blog.html",
            controller: function($scope){
                $scope.title = 'The Blog';
                $scope.subtitle = 'Real men do blog, and so do I';
            }
        })
            .state('blog.ios', {
                url: "/ios",
                templateUrl: "views/blog.ios.html"
            })
                .state('blog.ios.one', {
                    url: '/one',
                    templateUrl: 'views/ios_posts/one.html'
                })
                .state('blog.ios.two', {
                    url: '/two',
                    templateUrl: 'views/ios_posts/two.html'
                })

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
