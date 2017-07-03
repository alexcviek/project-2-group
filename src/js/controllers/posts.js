angular
  .module('sausageApp')
  .controller('PostsIndexCtrl', PostsIndexCtrl)
  .controller('PostsNewCtrl', PostsNewCtrl)
  .controller('PostsShowCtrl', PostsShowCtrl)
  .controller('PostsEditCtrl', PostsEditCtrl);

PostsIndexCtrl.$inject = ['Post', 'filterFilter', '$scope'];
function PostsIndexCtrl(Post, filterFilter, $scope){
  const vm = this;
  Post.query((posts) => {
    vm.all = posts;
    filterPosts();
  });
  
  function filterPosts(){
    const params = { title: vm.q };
    vm.filtered = filterFilter(vm.all, params);
  }

  $scope.$watchGroup([
    () => vm.q
  ], filterPosts);

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
