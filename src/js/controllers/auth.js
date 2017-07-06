angular
  .module('sausageApp')
  .controller('LoginCtrl', LoginCtrl)
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user = {};

  function submit() {
    if(vm.registerForm.$valid){
      $auth.signup(vm.user)
      .then(() => $state.go('login')); //someone has just registered and is then redirected to the login page
    }
  }

  vm.submit = submit;

}

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    if(vm.loginForm.$valid){
      $auth.login(vm.credentials) //where else does this tie in..?
      .then(() => $state.go('dashboard')); //when you login you see the dashboard page .. need to set this up
      
    }
  }
  vm.submit = submit;
  function authenticate(provider){
    $auth.authenticate(provider)
    .then(() => $state.go('dashboard'));
  }

  vm.authenticate = authenticate;

}
