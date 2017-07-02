angular
  .module('sausageApp')
  .controller('FoodBanksIndexCtrl', FoodBanksIndexCtrl)
  .controller('FoodBanksNewCtrl', FoodBanksNewCtrl)
  .controller('FoodBanksShowCtrl', FoodBanksShowCtrl)
  .controller('FoodBanksEditCtrl', FoodBanksEditCtrl);

FoodBanksIndexCtrl.$inject = ['FoodBank'];
function FoodBanksIndexCtrl(FoodBank){
  const vm = this;
  function foodBanksIndex(){
    vm.all = FoodBank.query();
  }
  foodBanksIndex();
}
FoodBanksNewCtrl.$inject = ['$state', 'FoodBank'];
function FoodBanksNewCtrl($state, FoodBank){
  const vm = this;
  vm.foodBank = {};

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
  vm.create = foodBanksCreate;
}

FoodBanksShowCtrl.$inject = ['FoodBank', '$stateParams', '$state'];
function FoodBanksShowCtrl(FoodBank, $stateParams, $state) {
  const vm = this;

  vm.foodBank = FoodBank.get($stateParams);

  function foodBanksDelete() {
    vm.foodBank
      .$remove()
      .then(() => $state.go('foodBanksIndex'));
  }

  vm.delete = foodBanksDelete;
}

FoodBanksEditCtrl.$inject = ['FoodBank', '$stateParams', '$state'];
function FoodBanksEditCtrl(FoodBank, $stateParams, $state) {
  const vm = this;

  vm.foodBank = FoodBank.get($stateParams);

  function foodBanksUpdate() {
    if (vm.foodBankForm.$valid) {
      vm.foodBank
        .$update()
        .then(() => $state.go('foodBanksShow', $stateParams));
    }
  }

  vm.update = foodBanksUpdate;
}
