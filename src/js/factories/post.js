angular
.module('sausageApp')
.factory('Post', Post);

Post.$inject = ['$resource', 'API'];
function Post($resource, API){
  return $resource(`${API}/posts/:id`, { id: '@id' }, {
    'update': { method: 'PUT' }
  });
}
