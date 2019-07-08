export default (context) => {
  if (context.isHMR) {
    return;
  }

  const requestedLocale = context.params.locale;
  if (context.store.state.i18n.locales.indexOf(requestedLocale) === -1) {
    context.redirect(`/${context.app.i18n.fallbackLocale}`);
    return;
  }

  context.store.commit('i18n/setLocale', requestedLocale);
  context.app.i18n.locale = requestedLocale;
};
