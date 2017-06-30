angular
.module('sausageApp')
.factory('FoodBank', FoodBank);

FoodBank.$inject = ['$resource', 'API'];
function FoodBank($resource, API){
  return $resource(`${API}/foodbanks/:id`, { id: '@id' }, {
    'update': { method: 'PUT' }
  });
}
