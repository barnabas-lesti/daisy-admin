export default ({ store, redirect, app }) => {
  if (store.state.auth.user) return redirect(app.localePath({ name: 'index' }));
};
