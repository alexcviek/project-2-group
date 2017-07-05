angular
.module('sausageApp')
.controller('UsersShowCtrl', UsersShowCtrl)
.controller('UsersEditCtrl', UsersEditCtrl);


UsersShowCtrl.$inject = ['$auth', 'User', '$state', 'Post', '$stateParams'];
function UsersShowCtrl($auth, User, $state, Post, $stateParams) {
  const vm = this;



  vm.posts = Post.query({
    createdBy: $state.params.id
  }, (data)=>{
    const filtered = data.filter((post)=>{
      return post.createdBy.id === $stateParams.id;
    });
    vm.user.posts = filtered;
  });


  vm.user = User.get($stateParams);
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
