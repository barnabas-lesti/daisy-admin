const locales = [ 'en' ];
const [ locale ] = locales;

export const state = () => ({
  locales,
  locale,
  defaultLocale: locale,
  fallbackLocale: locale,
  silentTranslationWarn: false,
});

export const mutations = {
  setLocale (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale;
    }
  },
  pushLocales (state, payload) {
    const locales = Array.isArray(payload) ? payload : [ payload ];
    state.locales.push(...locales);
  },
};
