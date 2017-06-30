angular
  .module('sausageApp')
  .controller('PostsIndexCtrl', PostsIndexCtrl);

PostsIndexCtrl.$inject = ['Post', '$auth'];
function PostsIndexCtrl(Post, $auth){
  const vm = this;
  function postsIndex(){
    vm.all = Post.query();
  }
  postsIndex();
}
