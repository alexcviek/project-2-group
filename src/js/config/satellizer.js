angular
.module('sausageApp')
.config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider){
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';
  $authProvider.github({
    url: '/api/oauth/github',
    clientId: 'd0c10edb0e8e21505817'
  });
  $authProvider.facebook({
    url: '/api/oauth/facebook',
    clientId: '1397101173700413'
  });
}


//The ability to change a profile image and keep it on the site rather than it
//reverting after session.
