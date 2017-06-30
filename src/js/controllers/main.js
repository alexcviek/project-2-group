angular
  .module('sausageApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth'];
function MainCtrl($rootScope, $state, $auth) {
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.message; //error coming from our API

    if(err.status === 401) {
      vm.stateHasChanged = false;
      $state.go('login');
    }
  });

  $rootScope.$on('$stateChangeSuccess', (e, state) => {
    vm.pageName = state.name;
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
  });

  function logout() {
    $auth.logout();
    $state.go('/dashboard'); //remember to create dashboard also where will the user be redirected after they logout ../
  }

  vm.logout = logout;
}
