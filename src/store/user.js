import User from '../models/user';

export const state = () => ({
  user: null,
});

export const mutations = {
  setUser (state, user) {
    state.user = user ? new User(user) : null;
  },
  login (state) {
    state.user = {
      imageUrl: 'https://randomuser.me/api/portraits/men/85.jpg',
      fullName: 'Jon Snow',
      isLoggedIn: true,
    };
  },
  logout (state) {
    state.user = {};
  },
};
