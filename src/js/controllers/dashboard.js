angular
.module('sausageApp')
.controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['FoodBank', 'Post'];
function DashboardCtrl(FoodBank, Post){
  const vm = this;

  vm.foodBanks = FoodBank.query();
  vm.posts = Post.query();

}
