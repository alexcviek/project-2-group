angular
  .module('sausageApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'js/views/static/home.html'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'js/views/dashboard/dashboard.html'
  })
  .state('postsIndex', {
    url: '/posts',
    templateUrl: 'js/views/posts/index.html',
    controller: 'PostsIndexCtrl as postsIndex'
  })
  .state('postsShow', {
    url: '/posts/:id',
    templateUrl: 'js/views/posts/show.html',
    controller: 'PostsShowCtrl as postsShow'
  })
  .state('postsNew', {
    url: '/posts/new',
    templateUrl: 'js/views/posts/new.html',
    controller: 'PostsNewCtrl as postsNew'
  })
  .state('postsEdit', {
    url: '/posts/:id/edit',
    templateUrl: 'js/views/posts/edit.html',
    controller: 'PostsEditCtrl as postsEdit'
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
  .state('foodBanksEdit', {
    url: '/foodbanks/:id/edit',
    templateUrl: 'js/views/foodBanks/edit.html',
    controller: 'FoodBanksEditCtrl as foodBanksEdit'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'js/views/auth/login.html',
    controller: 'LoginCtrl as login'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'js/views/auth/register.html',
    controller: 'RegisterCtrl as register'
  })
  .state('usersShow', {
    url: '/users/:id',
    templateUrl: 'js/views/users/show.html',
    controller: 'UsersShowCtrl as usersShow'
  })
  .state('usersEdit', {
    url: '/users/:id/edit',
    templateUrl: 'js/views/users/edit.html',
    controller: 'UsersEditCtrl as usersEdit'
  });
  $urlRouterProvider.otherwise('/dashboard');
}
