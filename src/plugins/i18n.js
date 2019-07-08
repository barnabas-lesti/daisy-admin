import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default (context) => {
  context.app.i18n = new VueI18n({
    locale: context.store.state.i18n.locale,
    fallbackLocale: 'en',
  });
};
