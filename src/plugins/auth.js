import Vue from 'vue';

class Auth {
  constructor ({ $axios, $logger, store, app: { $cookies } }) {
    this.$axios = $axios;
    this.$store = store;
    this.$cookies = $cookies;
    this.$logger = $logger;
  }

  async register (user) {
    const response = await this.$axios.$put('/api/users', user);
    await this.sendEmailVerification(user.email);
    return response;
  }

  async sendEmailVerification (email) {
    const { locale } = this.$store.state.i18n;
    const response = await this.$axios.$post('/api/auth/send-verification-email', { email, locale });
    return response;
  }

  async signIn (email, password) {
    const { user, accessToken } = await this.$axios.$post('/api/auth/sign-in', { email, password });
    this.$store.commit('user/signIn', user);
    this.$cookies.set('access-token', accessToken);
    this.$axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  signOut () {
    this.$store.commit('user/signOut');
    this.$cookies.remove('access-token');
    this.$axios.defaults.headers.common['Authorization'] = null;
  }

  async checkAuthState () {
    const token = this.$cookies.get('access-token');
    if (!this.$store.state.user.user && token) {
      try {
        const user = await this.$axios.$post('/api/auth/verify-auth-token', { token });
        this.$store.commit('user/signIn', user);
        this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
