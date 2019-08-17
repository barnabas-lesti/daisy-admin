import Vue from 'vue';

class Auth {
  constructor ({ $axios, store, redirect, app: { $cookies } }) {
    this.$axios = $axios;
    this.$store = store;
    this.$cookies = $cookies;
    this.redirect = redirect;

    const { accessToken } = this.$store.state.auth;
    if (accessToken) $axios.setHeader('Authorization', `Bearer ${accessToken}`);
  }
}

export default (context) => {
  const auth = new Auth(context);

  context.$auth = auth;
  Vue.prototype.$auth = auth;
};
