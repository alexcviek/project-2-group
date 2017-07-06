angular
.module('sausageApp')
.factory('User', User);

User.$inject = ['$resource'];
function User($resource){
  return $resource('/api/users/:id', { id: '@id' }, {
    'update': { method: 'PUT' }
  });
}
