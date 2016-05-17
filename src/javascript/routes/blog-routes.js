app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider.state('blog', {
    url: "/blog",
    templateUrl: "src/views/blog.html",
    controller: function ($scope, $sce, $state) {
      highlightSelectedNav('nav-blog');
      $('.description').hide();

      $scope.title = 'The Blog';
      $scope.subtitle = 'I will be updating this page soon';
      $scope.categories = [
        {
          list: 'recipes',
          title: 'Recipes',
          state: 'recipes.meals',
          src: 'http://wupy101.com/wp-content/uploads/sites/61/t1larg.recipes.jpg',
          desc: 'Delicious concoctions you\'ll be itching to try!'
        },
        {
          list: 'ios',
          title: 'iOS posts',
          state: 'blog.list',
          src: 'https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/move-to-ios-icon.png',
          desc: 'Issues I ran into during my first attempt at iOS development'
        }
      ];
      $scope.ios = [
        'iOS UI Creation Methods',
        'Break Statements',
        'Hash Symbol',
        'Static Data Storage',
        'UI Popover Controller',
        'Transfer Delegate Selection to Parent',
        'Variable Initialization'
      ];

      addPagerClickListeners();
    }
  });

  $stateProvider.state('blog.categories', {
    url: '/categories',
    template: '<div card items="categories" state="blog.list" size="medium" cols="s12 m6"></div>'
  });

  $stateProvider.state('blog.list', {
    url: '/{list}',
    template: '<ul id="blog-list" class="z-bubble"></ul>',
    controller: function ($scope, $stateParams) {
      var items = $scope.$parent[$stateParams.list];

      var html = '';
      for (var i = 0; i < items.length; ++i) {
        var url = '#/blog/item/' + $stateParams.list + '/' + i;
        var tag = '<li><a href="{0}">{1}</a></li>\n';
        html += tag.format(url, items[i]);
      }

      $('#blog-list').html(html);
    }
  });

  $stateProvider.state('blog.post', {
    url: '/item/{list}/{blogPostId}',
    template: function () {
      return '<div markdown id="blogpost" class="blogpost"></markdown>';
    },
    controller: function ($scope, $stateParams, $window) {
      var url = 'assets/blog-posts/{0}/blog{1}.md';
      url = url.format($stateParams.list, $stateParams.blogPostId);
      util.insertMarkdown(url, '#blogpost');
    }
  });

});