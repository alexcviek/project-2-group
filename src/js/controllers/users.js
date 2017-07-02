angular
  .module('sausageApp')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$auth', 'User', '$state'];
function ProfileCtrl($auth, User, $state) {
  const vm = this;
  const { userId } = $auth.getPayload();

  if(userId) vm.user = User.get({ id: userId });

  UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
  function UsersEditCtrl(User, $stateParams, $state) {
    const vm = this;

    vm.post = User.get($stateParams);

    function usersUpdate() {
      if (vm.userForm.$valid) {
        vm.user
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
