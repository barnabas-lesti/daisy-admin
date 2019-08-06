import Vue from 'vue';

class Auth {
  constructor ({ $axios, store, redirect, app: { $cookies } }) {
    this.$axios = $axios;
    this.$store = store;
    this.$cookies = $cookies;
    this.redirect = redirect;
  }

  async signIn (email, password) {
    const { user, accessToken } = await this.$axios.$post('/api/auth/sign-in', { email, password });
    this.$store.commit('user/signIn', { user, accessToken });
    this.$cookies.set('access-token', accessToken);
    this.$axios.setHeader('Authorization', `Bearer ${accessToken}`);
  }

  signOut () {
    this.$store.commit('user/signOut');
    this.$cookies.remove('access-token');
    this.$axios.setHeader('Authorization', null);
    this.redirect({ name: 'locale' });
  }
}

export default (context) => {
  const auth = new Auth(context);

  context.$auth = auth;
  Vue.prototype.$auth = auth;
};
