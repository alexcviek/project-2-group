angular
.module('sausageApp')
.factory('Post', Post)
.factory('PostComment', postComment);

Post.$inject = ['$resource', 'API'];
function Post($resource, API){
  return $resource(`${API}/posts/:id`, { id: '@id' }, {
    'update': { method: 'PUT' }
  });
}

postComment.$inject = ['$resource'];
function postComment($resource){
  return new $resource('/api/posts/:postId/comments/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
