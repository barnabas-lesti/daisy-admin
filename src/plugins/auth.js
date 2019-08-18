export default async ({ store, app: { $cookies } }) => {
  // Setup authorization on the client side as well (axios headers, etc.)
  if (process.client) {
    const { user, accessToken } = store.state.auth;
    if (user) return store.commit('auth/signIn', { user, accessToken });
  };

  const accessToken = $cookies.get('access-token');
  if (!accessToken) return;

  await store.dispatch('auth/verifyAccessToken', { accessToken });
};
