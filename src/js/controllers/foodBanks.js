angular
  .module('sausageApp')
  .controller('FoodBanksIndexCtrl', FoodBanksIndexCtrl)
  .controller('FoodBanksNewCtrl', FoodBanksNewCtrl)
  .controller('FoodBanksShowCtrl', FoodBanksShowCtrl)
  .controller('FoodBanksEditCtrl', FoodBanksEditCtrl);

FoodBanksIndexCtrl.$inject = ['FoodBank', 'filterFilter', '$scope'];
function FoodBanksIndexCtrl(FoodBank, filterFilter, $scope){
  const vm = this;
  FoodBank.query((foodBanks) => {
    vm.all = foodBanks;
    filterFoodBanks();
  });

  function filterFoodBanks(){
    const params = { name: vm.q };
    vm.filtered = filterFilter(vm.all, params);
  }

  $scope.$watchGroup([
    () => vm.q
  ], filterFoodBanks);
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
