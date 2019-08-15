import User from '../models/user';

export const state = () => ({
  user: null,
  accessToken: null,
});

export const mutations = {
  signIn (state, { user, accessToken }) {
    state.user = new User(user);
    state.accessToken = accessToken;
  },
  signOut (state) {
    state.user = null;
    state.accessToken = null;
  },
  updateUser (state, { nickname, profileImageUrl }) {
    if (nickname) state.user.nickname = nickname;
    if (profileImageUrl !== undefined) state.user.profileImageUrl = profileImageUrl;
  },
};

export const actions = {
  async sendRegistrationEmail (store, { email, password, nickname }) {
    store.commit('startLoading');
    const { locale } = store.rootState.i18n;
    console.log(store);
    console.log(this);
    try {
      await this.$axios.$post('/api/auth/send-registration-email', { email, password, nickname, locale });
      store.commit('notifications/showInfo', 'notifications.registrationEmailSent', { email });
    } catch (ex) {
      let errorMessageKey;
      const error = ex.response || ex;
      if (error.status === 409) errorMessageKey = 'errors.emailAlreadyInUse';
      else if (error.status === 400) errorMessageKey = 'errors.badRequest';
      else {
        errorMessageKey = 'errors.serverError';
        this.$logger.error(error);
      }
      throw { errorMessageKey };
    }
    this.$nuxt.$loading.finish();
  },
};
