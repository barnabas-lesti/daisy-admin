export const state = () => ({});

export const mutations = {
  updateConfig (state, payload) {
    state = { ...state, ...payload };
  },
};
