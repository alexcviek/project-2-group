angular
.module('sausageApp')
.factory('Post', Post)
.factory('PostComment', postComment);

Post.$inject = ['$resource'];
function Post($resource){
  return $resource('/api/posts/:id', { id: '@id' }, {
    'update': { method: 'PUT' }
  });
}

postComment.$inject = ['$resource'];
function postComment($resource){
  return new $resource('/api/posts/:postId/comments/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
