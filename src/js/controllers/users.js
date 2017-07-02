angular
  .module('sausageApp')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$auth', 'User', '$state', '$stateParams'];
function ProfileCtrl($auth, User, $state, $stateParams) {
  const vm = this;
  const { userId } = $auth.getPayload();

  if(userId) vm.user = User.get({ id: userId });

  function usersUpdate() {
    if (vm.userForm.$valid) {
      vm.post
        .$update()
        .then(() => $state.go('usersShow', $stateParams));
    }
  }

  vm.update = usersUpdate;

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;
}
