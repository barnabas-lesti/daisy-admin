const path = require('path');
const fs = require('fs-extra');

const {
  NODE_ENV,
  PORT,
  BASE_URL,
  SENTRY_DSN,
  I18N_DEFAULT_LOCALE,
  I18N_FALLBACK_LOCALE,
  I18N_SILENT_TRANSLATION_WARN,
  IS_DEV,
  IS_PROD,
} = require('./env');

const I18N_LANG_DIR = 'locales/';

const getLocales = () => {
  const files = fs.readdirSync(path.join(__dirname, '../src', I18N_LANG_DIR));
  return files.map((file) => {
    const iso = file.replace(/\.ya?ml|\.json|\.js/, '');
    const code = iso.replace(/-../, '');
    return { file, code, iso };
  });
};

console.log(I18N_SILENT_TRANSLATION_WARN);

module.exports = {
  mode: 'universal',
  srcDir: './src',
  loading: '~/components/base/base-loader.vue',

  env: {
    NODE_ENV,
  },

  dev: IS_DEV,

  server: {
    port: PORT,
  },

  head: {
    titleTemplate: '%s | Daisy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },

  router: {
    middleware: [
      'global/auth',
    ],
  },

  plugins: [
    'plugins/filters',
    'plugins/mixins',
    'plugins/logger',
    'plugins/auth',
  ],

  modules: [
    '@nuxtjs/sentry',
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    'nuxt-i18n',
    'cookie-universal-nuxt',
  ],

  sentry: {
    dsn: SENTRY_DSN,
  },

  axios: {
    baseURL: BASE_URL,
  },

  vuetify: {
    materialIcons: true,
    treeShake: IS_PROD,
  },

  i18n: {
    locales: getLocales(),
    defaultLocale: I18N_DEFAULT_LOCALE,
    vueI18nLoader: true,
    lazy: true,
    langDir: I18N_LANG_DIR,
    strategy: 'prefix',
    baseUrl: BASE_URL,
    rootRedirect: I18N_DEFAULT_LOCALE,
    detectBrowserLanguage: {
      fallbackLocale: I18N_DEFAULT_LOCALE,
    },
    vueI18n: {
      fallbackLocale: I18N_FALLBACK_LOCALE,
      silentTranslationWarn: I18N_SILENT_TRANSLATION_WARN,
    },
    vuex: {
      moduleName: 'i18n',
      syncLocale: true,
    },
  },

  build: {
    extend (config) {
      config.module.rules.push(
        {
          test: /\.ya?ml$/,
          loader: 'js-yaml-loader',
        },
      );
    },
  },
};
