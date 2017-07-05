angular
.module('sausageApp')
.controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['FoodBank', 'filterFilter', '$scope', 'userLocation', '$rootScope'];
function DashboardCtrl(FoodBank, filterFilter, $scope, userLocation, $rootScope){

  const vm = this;

  foodBanksIndex();
  function foodBanksIndex(){
    vm.all = FoodBank.query();
  }


}
