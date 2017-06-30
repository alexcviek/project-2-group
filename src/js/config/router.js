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
    controller: 'postsIndexCtrl as postsIndex'
  });
  $urlRouterProvider.otherwise('/');
}
