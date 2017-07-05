angular
  .module('sausageApp')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['meetupService', 'FoodBank', 'filterFilter', '$scope', 'userLocation', '$rootScope'];
function DashboardCtrl(meetupService, FoodBank, filterFilter, $scope, userLocation, $rootScope){

  const vm = this;

  foodBanksIndex();
  function foodBanksIndex(){
    vm.all = FoodBank.query();
  }

  meetupService.getMeetups()
    .then(data => vm.meetups = data);

}
