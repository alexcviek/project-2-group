angular
  .module('sausageApp')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['meetupService'];
function DashboardCtrl(meetupService) {
  const vm = this;

  meetupService.getMeetups()
    .then(data => vm.meetups = data);
}
