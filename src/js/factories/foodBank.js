angular
.module('sausageApp')
.factory('FoodBank', FoodBank);

FoodBank.$inject = ['$resource'];
function FoodBank($resource){
  return $resource('/api/foodbanks/:id', { id: '@id' }, {
    'update': { method: 'PUT' }
  });
}
