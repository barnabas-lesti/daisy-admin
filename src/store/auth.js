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
    this.$cookies.set('access-token', accessToken);
    this.$axios.setHeader('Authorization', `Bearer ${accessToken}`);
  },
  signOut (state) {
    state.user = null;
    state.accessToken = null;
    this.$cookies.remove('access-token');
    this.$axios.setHeader('Authorization', null);
  },
  updateUser (state, { fullName, profileImageUrl }) {
    if (fullName) state.user.fullName = fullName;
    if (profileImageUrl !== undefined) state.user.profileImageUrl = profileImageUrl;
  },
};

export const actions = {
  async verifyAccessToken (store, { accessToken }) {
    try {
      const user = await this.$axios.$post('/api/auth/verify-access-token', { token: accessToken });
      store.commit('signIn', { user, accessToken });
    } catch (ex) {
      const error = ex.response || ex;
      if (error.status === 401) this.$cookies.remove('access-token');
      else this.$logger.error(error);
    }
  },
  async sendRegistrationEmail (store, { email, password, fullName }) {
    store.commit('startLoading', null, { root: true });
    const { locale } = store.rootState.i18n;
    try {
      await this.$axios.$post('/api/auth/send-registration-email', { email, password, fullName, locale });
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
  async sendPasswordResetEmail (store, { email }) {
    store.commit('startLoading', null, { root: true });
    const { locale } = store.rootState.i18n;
    try {
      await this.$axios.$post('/api/auth/send-password-reset-email', { email, locale });
    } catch (ex) {
      const error = ex.response || ex;
      if (error.status === 404) throw new AppError('userNotFound');
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
  async signIn (store, { email, password }) {
    store.commit('startLoading', null, { root: true });
    try {
      const { user, accessToken } = await this.$axios.$post('/api/auth/sign-in', { email, password });
      store.commit('signIn', { user, accessToken });
    } catch (ex) {
      const error = ex.response || ex;
      if (error.status === 401) throw new AppError('authenticationFailed');
      else {
        this.$logger.error(error);
        throw new AppError('serverError');
      }
    } finally {
      store.commit('finishLoading', null, { root: true });
    }
  },
  async resetPassword (store, { token, password }) {
    store.commit('startLoading', null, { root: true });
    try {
      await this.$axios.$patch('/api/auth/password', { token, password });
    } catch (ex) {
      const error = ex.response || ex;
      if (error.status === 401) throw new AppError('invalidToken');
      else {
        this.$logger.error(error);
        throw new AppError('serverError');
      }
    } finally {
      store.commit('finishLoading', null, { root: true });
    }
  },
};
