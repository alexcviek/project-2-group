angular
.module('sausageApp')
.config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider){
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';
  $authProvider.github({
    url: '/api/oauth/github',
    clientId: '3b35ffa04f89f7ae1e67'
  });
  $authProvider.facebook({
    url: '/api/oauth/facebook',
    clientId: '134624920454350'
  });
}
