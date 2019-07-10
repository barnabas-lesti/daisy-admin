import Vue from 'vue';
// import auth0 from 'auth0-js';

class Auth {
  constructor (config) {
    console.log(config);

    // const webAuth = new auth0.WebAuth({
    //   domain: authConfig.domain,
    //   redirectUri: `${window.location.origin}/callback`,
    //   clientID: authConfig.clientId,
    //   responseType: 'id_token',
    //   scope: 'openid profile email'
    // });
  }
}

export default (context) => {
  const auth = new Auth(context.env);
  context.$auth = auth;
  Vue.prototype.$auth = auth;
};
