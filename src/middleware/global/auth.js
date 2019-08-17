export default async ({ $axios, $logger, store, app: { $cookies } }) => {
  if (store.state.auth.user) return;

  const accessToken = $cookies.get('access-token');
  if (!accessToken) return;

  await store.dispatch('auth/verifyAccessToken', { accessToken });
};
