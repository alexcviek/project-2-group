angular
.module('sausageApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', '$transitions', 'User'];
function MainCtrl($rootScope, $state, $auth, $transitions, User) {
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;
  vm.isNavCollapsed = true;

  vm.slides = [{
    image: 'https://images.unsplash.com/photo-1468664093569-795a12e8b31c?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=',
    text: 'Inspired by our pet friend, Sausage the Cat, this app lets you donate goods that would otherwise go unused.'
  },{
    image: 'https://images.unsplash.com/photo-1495732915095-32d9aea1d037?dpr=1&auto=compress,format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop=&bg=',
    text: 'Browse all posts to view items currently available for collection'
  },{
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?dpr=1&auto=format&fit=crop&w=1500&h=998&q=80&cs=tinysrgb&crop=&bg=',
    text: 'Reserve items on our site and exchange messages with other users to arrange collections' //need more images here..
  },{
    image: 'https://images.unsplash.com/photo-1444662708655-bd276c0ee8bd?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=',
    text: 'Food Bank drop off locations can be found and navigated to from our map below for those feeling extra helpful'
  },{
    image: 'https://images.unsplash.com/photo-1484712401471-05c7215830eb?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=',
    text: 'Use the feed to find out other ways to get involved in the community'
  }];

  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.message; //error coming from our API

    if(err.status === 401) {
      vm.stateHasChanged = false;
      $state.go('login');
    }
  });

  $transitions.onSuccess({}, (transition) => {
    vm.pageName = transition.$to().name;
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.currentUserId = $auth.getPayload().userId;
    if($auth.getPayload()) {
      vm.currentUserId = $auth.getPayload().userId;
      vm.currentUser = User.get({ id: vm.currentUserId });
    }
  });

  function logout() {
    $auth.logout();
    $state.go('home'); //remember to create dashboard also where will the user be redirected after they logout ../
  }

  vm.logout = logout;
}
