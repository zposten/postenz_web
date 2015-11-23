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

                $scope.photos = [
                    {
                        href: 'https://farm6.staticflickr.com/5789/22569131534_3df0b04b96_k.jpg',
                        size: '2048x1612',
                        thumbnail: 'https://farm6.staticflickr.com/5789/22569131534_413dc32383_n.jpg',
                        caption: 'Lucy'
                    },
                    {
                        href: 'https://farm1.staticflickr.com/779/22803462247_089191c557_k.jpg',
                        size: '2048x1285',
                        thumbnail: 'https://farm1.staticflickr.com/779/22803462247_64993c6b51_n.jpg',
                        caption: 'Totally Naked in Big Sky Country'
                    },
                    {
                        href: 'https://farm1.staticflickr.com/748/22829661879_57510a110c_k.jpg',
                        size: '2048x1109',
                        thumbnail: 'https://farm1.staticflickr.com/748/22829661879_283af85c10_n.jpg',
                        caption: 'Shattered'
                    },
                    {
                        href: 'https://farm1.staticflickr.com/636/22901825180_74eca2c966_k.jpg',
                        size: '2048x1044',
                        thumbnail: 'https://farm1.staticflickr.com/636/22901825180_50795e8d5e_n.jpg',
                        caption: 'Dam Lights'
                    },
                    {
                        href: 'https://farm1.staticflickr.com/563/22829650639_b706022001_k.jpg',
                        size: '2048x1365',
                        thumbnail: 'https://farm1.staticflickr.com/563/22829650639_9a902accc8_n.jpg',
                        caption: 'More Dam Lights'
                    },
                    {
                        href: 'https://farm1.staticflickr.com/5686/22829627569_31a912e4a3_k.jpg',
                        size: '2048x1005',
                        thumbnail: 'https://farm1.staticflickr.com/5686/22829627569_ea4fc8f467_n.jpg',
                        caption: 'Blurry Dam Lights'
                    },
                    {
                        href: 'https://farm1.staticflickr.com/5824/22901781600_623a3a208f_k.jpg',
                        size: '2048x902',
                        thumbnail: 'https://farm1.staticflickr.com/5824/22901781600_327f6b2997_n.jpg',
                        caption: 'Sunrise'
                    },
                    {
                        href: 'https://farm1.staticflickr.com/604/22829660459_b9d278a60e_k.jpg',
                        size: '2048x1365',
                        thumbnail: 'https://farm1.staticflickr.com/604/22829660459_f91c6ba2ec_n.jpg',
                        caption: 'Jumping Fences in the Badlands'
                    }
                ]
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
