angular
  .module('sausageApp')
  .controller('FoodBanksIndexCtrl', FoodBanksIndexCtrl)
  .controller('FoodBanksNewCtrl', FoodBanksNewCtrl)
  .controller('FoodBanksShowCtrl', FoodBanksShowCtrl)
  .controller('FoodBanksEditCtrl', FoodBanksEditCtrl);

FoodBanksIndexCtrl.$inject = ['FoodBank'];
function FoodBanksIndexCtrl(FoodBank){
  const vm = this;
  // vm.isAuthenticated = $auth.isAuthenticated;

  foodBanksIndex();
  function foodBanksIndex(){
    vm.all = FoodBank.query();
  }

  vm.delete = foodBanksDelete;

  function foodBanksDelete(foodBank){
    FoodBank.delete({ id: foodBank.id })
      .$promise
      .then(() => {
        const index = vm.all.indexOf(foodBank);
        vm.all.splice(index, 1);
      });
  }
}
FoodBanksNewCtrl.$inject = ['$state', 'FoodBank'];
function FoodBanksNewCtrl($state, FoodBank){
  const vm = this;
  vm.create = foodBanksCreate;

  function foodBanksCreate(){
    if(vm.foodBankForm.$valid){
      FoodBank
      .save(vm.foodBank)
      .$promise
      .then(() => {
        $state.go('foodBanksIndex');
      });
    }
  }
}

FoodBanksShowCtrl.$inject = ['$stateParams', 'FoodBank'];
function FoodBanksShowCtrl($stateParams, FoodBank){
  const vm = this;
  vm.foodBank = {};

  foodBanksShow();
  function foodBanksShow(){
    vm.foodBank = FoodBank.get($stateParams);
  }
}

FoodBanksEditCtrl.$inject = ['$stateParams', '$state', 'FoodBank'];
function FoodBanksEditCtrl($stateParams, $state, FoodBank){
  const vm = this;
  vm.foodBank = {};
  vm.update = foodBanksUpdate;

  foodBanksShow();
  function foodBanksShow(){
    vm.foodBank = FoodBank.get($stateParams);
  }

  function foodBanksUpdate(){
    if(vm.foodBankForm.$valid){
      FoodBank
      .update({ id: $stateParams.id }, vm.foodBank)
      .$promise
      .then(() => {
        $state.go('foodBanksShow', { id: vm.foodBank.id });
      });
    }
  }
}
