export const state = () => ({
  NODE_ENV: process.env.NODE_ENV,
  IS_PRODUCTION: process.env.IS_PRODUCTION,
  REGISTRATION_DISABLED: process.env.REGISTRATION_DISABLED,
});

export const mutations = {
  updateConfig (state, payload) {
    state = { ...state, ...payload };
  },
};
