angular
  .module('sausageApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', '$transitions', 'User'];
function MainCtrl($rootScope, $state, $auth, $transitions, User) {
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;

  vm.slides = [{
    image: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/19601519_10210260731020005_5310511868163244179_n.jpg?oh=834487f3251e194deb38d9133940e8cd&oe=59D29A31',
    text: 'Inspired by our pet friend, Sausage the Cat, this app brings goods that would otherwise go unused to someone who could use them.'
  },{
    image: 'https://images.unsplash.com/photo-1495732915095-32d9aea1d037?dpr=1&auto=compress,format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop=&bg=',
    text: 'Browse all posts to view items currently available for collection'
  },{
    image: 'https://static.pexels.com/photos/111150/pexels-photo-111150.jpeg',
    text: 'Reserve items on our site and exchange messages with other users to arrange collections' //need more images here..
  },{
    image: 'https://images.unsplash.com/photo-1495732915095-32d9aea1d037?dpr=1&auto=compress,format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop=&bg=',
    text: 'Food Bank locations can be found and navigated to from our map below'
  },{
    image: 'https://images.unsplash.com/photo-1495732915095-32d9aea1d037?dpr=1&auto=compress,format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop=&bg=',
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
    // if($auth.getPayload()) vm.currentUserImage = $auth.getPayload().userImage; -- TO DISPLAY USER IMAGE IN NAV
    if($auth.getPayload()) {
      vm.currentUserId = $auth.getPayload().userId;
      vm.currentUser = User.get({ id: vm.currentUserId });
    }
    console.log('payload', $auth.getPayload());

  });

  function logout() {
    $auth.logout();
    $state.go('home'); //remember to create dashboard also where will the user be redirected after they logout ../
  }

  vm.logout = logout;
}
