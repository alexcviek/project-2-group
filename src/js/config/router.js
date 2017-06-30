angular
  .module('sausageApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('postsIndex', {
    url: '/posts',
    templateUrl: 'js/views/posts/index.html',
    controller: 'PostsIndexCtrl as postsIndex'
  })
  .state('foodBanksIndex', {
    url: '/foodbanks',
    templateUrl: 'js/views/foodBanks/index.html',
    controller: 'FoodBanksIndexCtrl as foodBanksIndex'
  })
  .state('foodBanksNew', {
    url: '/foodbanks/new',
    templateUrl: 'js/views/foodBanks/new.html',
    controller: 'FoodBanksNewCtrl as foodBanksNew'
  })
  .state('foodBanksShow', {
    url: '/foodbanks/:id',
    templateUrl: 'js/views/foodBanks/show.html',
    controller: 'FoodBanksShowCtrl as foodBanksShow'
  })
  .state('foodbanksEdit', {
    url: '/foodbanks/:id/edit',
    templateUrl: 'js/views/foodBanks/edit.html',
    controller: 'FoodBanksEditCtrl as foodBanksEdit'
  });
  $urlRouterProvider.otherwise('/');
}
