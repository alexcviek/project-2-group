angular
  .module('sausageApp')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['meetupService','FoodBank', 'Post'];
function DashboardCtrl(meetupService, FoodBank, Post){
  const vm = this;

  vm.foodBanks = FoodBank.query();
  vm.posts = Post.query();

  meetupService.getMeetups()
    .then(data => vm.meetups = data);

}
