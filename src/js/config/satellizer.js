angular
.module('sausageApp')
.config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider){
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';
  $authProvider.github({
    url: '/api/oauth/github',
    clientId: '78728b29f8da09d64cb7'
  });
  $authProvider.facebook({
    url: '/api/oauth/facebook',
    clientId: '428530614196971'
  });
}
