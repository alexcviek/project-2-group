//facebook && instagram oauth
module.exports = {
  github: {
    loginURL: 'https://github.com/login/oauth/authorize',
    accessTokenURL: 'https://github.com/login/oauth/access_token',
    profileURL: 'https://api.github.com/user',
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    scope: 'user:email'
  },
  facebook: {
    loginUrl: 'https://www.facebook.com/v2.9/dialog/oauth',
    clientId: process.env.FACEBOOK_APP_ID,
    redirectUri: 'https://team-sausage.herokuapp.com/',
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    scope: 'user: email',
    accessTokenUrl: 'https://graph.facebook.com/v2.9/oauth/access_token'
  }
};
