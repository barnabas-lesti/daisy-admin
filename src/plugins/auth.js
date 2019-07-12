import Vue from 'vue';

class Auth {
  constructor (context) {
    this._context = context;
  }

  async signOut () {
    await this._context.$firebase.auth().signOut();
  }

  async signIn (email, password) {
    try {
      const { user } = await this._context.$firebase.auth().signInWithEmailAndPassword(email, password);
      // this.isOpen = false;
      // this.form.email = this.form.password = '';
      // this.$v.$reset();
      // this.$store.commit('notifications/showInfo', { html: this.$t('notifications.signIn', { email }) });
      return { user };
    } catch (ex) {
      if (ex.code === 'auth/wrong-password' || ex.code === 'auth/user-not-found') {
        this.errors.email = [this.$t('errors.email.authenticationFailed')];
      } else {
        this.$store.commit('notifications/showError', this.$t('notifications.serverError'));
        this.$sentry ? this.$sentry.captureException(ex) : console.error(ex);
      }
    }
  }
}

export default (context) => {
  const auth = new Auth(context);
  context.$auth = auth;
  Vue.prototype.$auth = auth;
};
