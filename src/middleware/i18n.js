export default (context) => {
  if (context.isHMR) { return; }

  const requestedLocale = context.params.locale;
  if (context.store.state.i18n.locales.indexOf(requestedLocale) === -1) {
    context.redirect({
      name: 'locale',
      params: { locale: context.app.i18n.fallbackLocale },
      query: { ...context.route.query },
    });
    return;
  }

  context.store.commit('i18n/setLocale', requestedLocale);
  context.app.i18n.locale = requestedLocale;
};
