import Vue from 'vue';

class Auth {
  constructor ({ $axios, $logger, store, app: { $cookies } }) {
    this.$axios = $axios;
    this.$store = store;
    this.$cookies = $cookies;
    this.$logger = $logger;
  }

  async checkAuthState () {
    const token = this.$cookies.get('access-token');
    if (!this.$store.state.user.user && token) {
      try {
        const user = await this.$axios.$post('/api/auth/verify-access-token', { token });
        this.$store.commit('user/signIn', user);
        this.$axios.setHeader('Authorization', `Bearer ${token}`);
      } catch (ex) {
        const error = ex.response || ex;
        if (error.status === 401) {
          this.$cookies.remove('access-token');
        } else {
          this.$logger.error(error);
        }
      }
    }
  }
}

export default async (context) => {
  const auth = new Auth(context);
  await auth.checkAuthState();

  context.$auth = auth;
  Vue.prototype.$auth = auth;
};
