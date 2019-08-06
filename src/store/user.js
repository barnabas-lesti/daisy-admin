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

export const getters = {
  getProfileImagePath ({ user: { avatar, profileImageUrl } }) {
    if (profileImageUrl) return profileImageUrl;
    if (avatar) return `/images/avatars/${avatar}`;
    return '/images/no-profile-picture.png';
  },
};
