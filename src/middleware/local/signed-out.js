export default ({ store, redirect, route }) => {
  if (store.state.auth.user) return redirect({ name: 'locale' });
};
