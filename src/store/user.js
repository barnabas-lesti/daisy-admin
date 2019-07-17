import User from '../models/user';

export const state = () => ({
  user: null,
});

export const mutations = {
  signIn (state, user) {
    state.user = new User(user);
  },
  signOut (state) {
    state.user = null;
  },
};
