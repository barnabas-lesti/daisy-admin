import AppError from '../models/app-error';
import User from '../models/user';

export const state = () => ({
  user: null,
  accessToken: null,
});

export const getters = {
  profileImageSrc (state) { return (state.user && state.user.profileImageUrl) || '/images/no-profile-image.png'; },
};

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
    store.commit('startLoading', null, { root: true });
    const { locale } = store.rootState.i18n;
    try {
      await this.$axios.$post('/api/auth/send-registration-email', { email, password, nickname, locale });
    } catch (ex) {
      const error = ex.response || ex;
      if (error.status === 409) throw new AppError('emailAlreadyInUse');
      else if (error.status === 400) throw new AppError('badRequest');
      else {
        this.$logger.error(error);
        throw new AppError('serverError');
      }
    } finally {
      store.commit('finishLoading', null, { root: true });
    }
  },
  async register (store, { token }) {
    store.commit('startLoading', null, { root: true });
    try {
      await this.$axios.$post('/api/auth/register', { token });
    } catch (ex) {
      const error = ex.response || ex;
      if (error.status === 401 || error.status === 400) throw new AppError('tokenInvalid');
      else if (error.status === 409) throw new AppError('emailAlreadyInUse');
      else {
        this.$logger.error(error);
        throw new AppError('serverError');
      }
    } finally {
      store.commit('finishLoading', null, { root: true });
    }
  },
};
