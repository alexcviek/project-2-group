angular
  .module('sausageApp')
  .controller('PostsIndexCtrl', PostsIndexCtrl)
  .controller('PostsNewCtrl', PostsNewCtrl)
  .controller('PostsShowCtrl', PostsShowCtrl)
  .controller('PostsEditCtrl', PostsEditCtrl);

PostsIndexCtrl.$inject = ['Post'];
function PostsIndexCtrl(Post){
  const vm = this;
  function postsIndex(){
    vm.all = Post.query();
  }
  postsIndex();
}

PostsNewCtrl.$inject = ['Post', '$state'];
function PostsNewCtrl(Post, $state) {
  const vm = this;
  vm.post = {};

  function postsCreate() {
    if (vm.postForm.$valid) {
      Post
        .save(vm.post)
        .$promise
        .then(() => $state.go('postsIndex'));
    }
  }

  vm.create = postsCreate;
}

PostsShowCtrl.$inject = ['Post', '$stateParams', '$state'];
function PostsShowCtrl(Post, $stateParams, $state) {
  const vm = this;

  vm.post = Post.get($stateParams);

  function postsDelete() {
    vm.post
      .$remove()
      .then(() => $state.go('postsIndex'));
  }

  vm.delete = postsDelete;
}

PostsEditCtrl.$inject = ['Post', '$stateParams', '$state'];
function PostsEditCtrl(Post, $stateParams, $state) {
  const vm = this;

  vm.post = Post.get($stateParams);

  function postsUpdate() {
    if (vm.postForm.$valid) {
      vm.post
        .$update()
        .then(() => $state.go('postsShow', $stateParams));
    }
  }

  vm.update = postsUpdate;
}
