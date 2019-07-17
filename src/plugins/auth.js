import Vue from 'vue';

class Auth {
  constructor ({ $axios, $sentry, store, app: { $cookies } }) {
    this.$axios = $axios;
    this.$store = store;
    this.$cookies = $cookies;
    this.$sentry = $sentry;
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
    const { user, authToken } = await this.$axios.$post('/api/auth/create-auth-token', { email, password });
    this.$store.commit('user/signIn', user);
    this.$cookies.set('auth-token', authToken);
    this.$axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  }

  signOut () {
    this.$store.commit('user/signOut');
    this.$cookies.remove('auth-token');
    this.$axios.defaults.headers.common['Authorization'] = null;
  }

  async checkAuthState () {
    const token = this.$cookies.get('auth-token');
    if (!this.$store.state.user.user && token) {
      try {
        const user = await this.$axios.$post('/api/auth/get-user-from-auth-token', { token });
        this.$store.commit('user/signIn', user);
        this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (ex) {
        const error = ex.response || ex;
        if (error.status === 401) {
          this.$cookies.remove('auth-token');
        } else {
          this.$sentry ? this.$sentry.captureException(error) : console.error(error);
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
