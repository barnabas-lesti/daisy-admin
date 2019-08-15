export default ({ store, redirect, route, app }) => {
  if (!store.state.auth.user) {
    return redirect(app.localePath({
      name: 'sign-in',
      query: { 'ref': route.name },
    }));
  }
};
