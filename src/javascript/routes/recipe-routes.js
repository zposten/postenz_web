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
          src: 'http://www.campbellskitchen.com/recipeimages/one-dish-chicken-rice-bake-large-24702.jpg',
          desc: "You guessed it, there's chicken and there's rice, but it doesn't stop there!"
        },
        {
          name: 'one-pot-taco-pasta',
          title: 'One Pot Taco Pasta',
          src: 'http://assets.kraftfoods.com/recipe_images/opendeploy/127214_640x428.jpg',
          desc: "You like tacos and you like pasta, what's not to love?"
        },
        {
          name: 'goulash',
          title: 'American Goulash',
          src: 'http://cdn.gonnawantseconds.netdna-cdn.com/wp-content/uploads/2012/11/American-Goulash-1.jpg',
          desc: "This traditional family favorite is nothing if not a comfort food"
        },
        {
          name: 'bbq-chicken',
          title: 'Crockpot BBQ Chicken',
          src: 'http://cf.familyfreshmeals.com/wp-content/uploads/2014/06/The-Best-Crockpot-BBQ-Chicken-Family-Fresh-Meals-.png',
          desc: "The easiest BBQ chicken you've ever made!"
        },
        {
          name: 'pizza',
          title: 'Johnny\'s Hommade Pizza',
          src: 'http://hilahcooking.com/wp-content/uploads/2011/12/pizza.jpg',
          desc: "It's hard to believe that this guy can cook, but after you try his pizza, there is no longer any denying."
        }
      ];
      $scope.recipes_breakfast = [
        {
          name: 'omelet',
          title: "Mom's Omlets",
          src: 'http://static.parade.com/wp-content/uploads/2012/12/potato-bacon-omelet_lucy-schaeffer1.jpg',
          desc: "My childhood favorite"
        },
        {
          name: 'french-toast',
          title: "Scotty's French Toast",
          src: 'http://cookdiary.net/wp-content/uploads/images/Cinnamon_French_Toast_2936.jpg',
          desc: "Back in 711, this stuff was a Sunday of finals week tradition"
        }
      ];
    }
  });

  $stateProvider.state('recipes.meals', {
    url: '/meals',
    template: '<div card items="meals" state="recipes.meal" size="medium" cols="s12 m6"></div>'
  });

  $stateProvider.state('recipes.meal', {
    url: '/meals/{meal}',
    // template: '<ul id="recipes" class="z-bubble"></ul>',
    template: function ($stateParams) {
      var markup = '<div card items="{0}" state="recipes.recipe" size="medium" cols="s12 m6"></div>';
      var items = 'recipes_' + $stateParams.meal;
      return markup.format(items);
    }
  });

  $stateProvider.state('recipes.recipe', {
    url: '/meals/{meal}/{name}',
    template: '<div markdown id="recipe" class="blogpost"></markdown>',
    controller: function ($scope, $stateParams) {
      var url = 'assets/recipes/recipe-' + $stateParams.name + '.md';
      util.insertMarkdown(url, '#recipe');
    }
  });

});