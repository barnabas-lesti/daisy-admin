export default ({ isHMR, params, store, redirect, route, app }) => {
  if (isHMR) return;

  const { locales, defaultLocale } = store.state.i18n;
  const requestedLocale = params.locale;
  if (locales.indexOf(requestedLocale) === -1) {
    redirect({
      name: 'locale',
      params: { locale: defaultLocale },
      query: { ...route.query },
    });
    return;
  }

  store.commit('i18n/setLocale', requestedLocale);
  app.i18n.locale = requestedLocale;
};
