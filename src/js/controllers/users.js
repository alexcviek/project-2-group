angular
.module('sausageApp')
.controller('UsersShowCtrl', UsersShowCtrl)
.controller('UsersEditCtrl', UsersEditCtrl);


UsersShowCtrl.$inject = ['$auth', 'User', '$state'];
function UsersShowCtrl($auth, User, $state) {
  const vm = this;
  const { userId } = $auth.getPayload();

  if(userId) vm.user = User.get({ id: userId });


  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;
}


UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);
  console.log(vm.user, 'here');
  function usersUpdate() {
    if (vm.userForm.$valid) {
      vm.user
      .$update()
      .then(() => $state.go('usersShow', $stateParams));
    }
  }

  vm.update = usersUpdate;
}
