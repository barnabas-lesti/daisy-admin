export const state = () => ({
  NODE_ENV: process.env.NODE_ENV,
  EMAIL_REGEX: new RegExp(process.env.EMAIL_REGEX_STRING),
});

export const mutations = {
  updateConfig (state, payload) {
    state = { ...state, ...payload };
  },
};
