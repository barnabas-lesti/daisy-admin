import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, store }) => {
  const { locale, fallbackLocale, silentTranslationWarn } = store.state.i18n;
  app.i18n = new VueI18n({ locale, fallbackLocale, silentTranslationWarn });
};
