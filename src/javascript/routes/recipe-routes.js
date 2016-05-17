app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider.state('recipes', {
    url: '/blog/recipes',
    templateUrl: "src/views/blog.html",
    controller: function ($scope, $state) {
      highlightSelectedNav('nav-blog');
      $('.subtitle').hide();

      $scope.title = 'Not So Fancy Foods';
      $scope.description = 'I\'m not much of a cook, but I love to eat.  I will be filling' +
        ' this page with recipes that I\'ve tried and particularly enjoyed.  This is as' +
        ' much for my reference as anyone else\'s, but please do try your hand and let me' +
        ' know what you think!';
      $scope.meals = [
        {
          meal: 'breakfast',
          title: 'Breakfast',
          src: 'http://restaurants-stlouismo.com/wp-content/uploads/2016/04/Pancake-Breakfast.jpg',
          desc: 'The most important meal of the day'
        },
        {
          meal: 'dinner',
          title: 'Not Breakfast',
          src: 'http://www.westportwhiskeyandwine.com/wp-content/uploads/2012/11/dinner.jpg',
          desc: "That meal you just can't wait to get home for"
        }
      ];
      $scope.recipes_dinner = [
        {
          name: 'chicken-and-rice',
          title: 'Mom\'s Chicken and Rice',
          meal: 'dinner',
          src: 'http://www.campbellskitchen.com/recipeimages/one-dish-chicken-rice-bake-large-24702.jpg',
          desc: "You guessed it, there's chicken and there's rice, but it doesn't stop there!"
        },
        {
          name: 'one-pot-taco-pasta',
          title: 'One Pot Taco Pasta',
          meal: 'dinner',
          src: 'http://assets.kraftfoods.com/recipe_images/opendeploy/127214_640x428.jpg',
          desc: "You like tacos and you like pasta, what's not to love?"
        },
        {
          name: 'goulash',
          title: 'American Goulash',
          meal: 'dinner',
          src: 'http://cdn.gonnawantseconds.netdna-cdn.com/wp-content/uploads/2012/11/American-Goulash-3.jpg',
          desc: "This traditional family favorite is nothing if not a comfort food"
        },
        {
          name: 'bbq-chicken',
          title: 'Crockpot BBQ Chicken',
          meal: 'dinner',
          src: 'http://3.bp.blogspot.com/_tjk909cESSk/S9z-ZZC7R4I/AAAAAAAABPI/JEwi9mgsvSA/s1600/bbq+pork+5.jpg',
          desc: "The easiest BBQ chicken you've ever made!"
        },
        {
          name: 'pizza',
          title: 'Johnny\'s Hommade Pizza',
          meal: 'dinner',
          src: 'http://hilahcooking.com/wp-content/uploads/2011/12/pizza.jpg',
          desc: "It's hard to believe that this guy can cook, but after you try his pizza, there is no longer any denying."
        }
      ];
      $scope.recipes_breakfast = [
        {
          name: 'omelet',
          title: "Mom's Omlets",
          meal: 'breakfast',
          src: 'http://static.parade.com/wp-content/uploads/2012/12/potato-bacon-omelet_lucy-schaeffer1.jpg',
          desc: "My childhood favorite"
        },
        {
          name: 'french-toast',
          title: "Scotty's French Toast",
          meal: 'breakfast',
          src: 'http://cookdiary.net/wp-content/uploads/images/Cinnamon_French_Toast_2936.jpg',
          desc: "Back in 711, this stuff was a Sunday of finals week tradition"
        }
      ];
    }
  });

  $stateProvider.state('recipes.meals', {
    url: '/meals',
    template: '<card items="meals" state="recipes.meal" size="medium" cols="s12 m6"></card>'
  });

  $stateProvider.state('recipes.meal', {
    url: '/meals/{meal}',
    template: function ($stateParams) {
      var markup = '<card items="{0}" state="recipes.recipe" size="medium" cols="s12 m6"></card>';
      var items = 'recipes_' + $stateParams.meal;
      return markup.format(items);
    }
  });

  $stateProvider.state('recipes.recipe', {
    url: '/meals/{meal}/{name}',
    template: function ($stateParams, $scope) {
      return [
        '<div class="parallax-container">',
        '  <div class="parallax">',
        '    <img src="http://az619519.vo.msecnd.net/files/Plumeria_EN-US10602273150_1366x768.jpg">',
        '  </div>',
        '</div>',
        '<markdown id="recipe" class="blogpost"></divmarkdown>'
      ].join('\n');
    },
    controller: function ($scope, $stateParams) {
      var url = 'assets/recipes/recipe-' + $stateParams.name + '.md';
      util.insertMarkdown(url, '#recipe');

      console.log('here');
      console.log($scope.$parent)
      console.log($stateParams.meal);
      var recipes = $scope.$parent['recipes_' + $stateParams.meal];
      console.log(recipes);
      var recipe = $.grep(recipes, function (e) {return e.name == $stateParams.name;})[0];

      $('.parallax > img').attr('src', recipe.src);
      $('.parallax').parallax();
    }
  });

});