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

                highlightSelectedNav('nav-home');
            }
        })

        .state('contact', {
            url: "/contact",
            templateUrl: "views/contact.html",
            controller: function($scope) {
                $scope.title = 'Contact Information'
                $scope.subtitle = 'How you\'ll reach me when you inevitably want to';

                highlightSelectedNav('nav-contact');
            }
        })

        .state('blog', {
            url: "/blog",
            templateUrl: "views/blog.html",
            controller: function($scope){
                $scope.title = 'The Blog';
                $scope.subtitle = 'Real men do blog, and so do I';

                highlightSelectedNav('nav-blog');
            }
        })
            .state('blog.one', {
                url: '/ios/one',
                templateUrl: 'views/ios_posts/one.html'
            })
            .state('blog.two', {
                url: '/ios/two',
                templateUrl: 'views/ios_posts/two.html'
            })

        .state('photos', {
            url: '/photos',
            templateUrl: 'views/photos.html',
            controller: function($scope) {

                $scope.title = 'Posten Photography';
                $scope.subtitle = 'I have taken at least one good photo';
                $scope.photos = photoswipe.photos;

                highlightSelectedNav('nav-photos');
            }
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


app.directive('photoswipe',  ['$rootScope', function($rootScope) {
    return {
        restrict: 'EA',
        templateUrl: 'views/gallery.html',
        link: function(scope, elem, attrs) {
            //attrs references any attributes on the directive element in html
            //elem is the actual DOM element of the directive,so you can bind it with jQuery

            photoswipe.init('.demo-gallery');
        }
    };
}]);
