angular
.module('sausageApp')
.controller('ProfileCtrl', ProfileCtrl)
.controller('UsersEditCtrl', UsersEditCtrl)
.controller('UsersShowCtrl', UsersShowCtrl);

ProfileCtrl.$inject = ['$auth', 'User'];
function ProfileCtrl($auth, User) {
  const vm = this;
  console.log('in here');
  console.log('here', $auth.getPayload());

  const { userId } = $auth.getPayload();

  if(userId) vm.user = User.get({ id: userId });

}

UsersShowCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersShowCtrl(User, $stateParams, $state) {
  const vm = this;
  vm.user = User.get($stateParams);
  // console.log('here', $auth.getPayload());
  //
  // const { userId } = $auth.getPayload();
  //
  // if(userId) vm.user = User.get({ id: userId });

  function userDelete() {
    vm.post
    .$remove()
    .then(() => $state.go('home'));
  }
  vm.delete = userDelete;
}

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

}
