const {
  NODE_ENV,
  IS_PRODUCTION,
  REGISTRATION_DISABLED,
  PORT,
  BASE_URL,
  SENTRY_DSN,
} = require('./env.config');

module.exports = {
  mode: 'universal',
  srcDir: './src',
  loading: '~/components/base/base-loader.vue',

  env: {
    NODE_ENV,
    IS_PRODUCTION,
    REGISTRATION_DISABLED,
  },
  dev: !IS_PRODUCTION,

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
    treeShake: IS_PRODUCTION,
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US' },
    ],
    defaultLocale: 'en',
    vueI18nLoader: true,
    strategy: 'prefix',
    seo: false,
    baseUrl: BASE_URL,
    rootRedirect: 'en',
    detectBrowserLanguage: {
      fallbackLocale: 'en',
    },
    vueI18n: {
      fallbackLocale: 'en',
      silentTranslationWarn: false,
    },
    vuex: {
      moduleName: 'i18n',
      syncLocale: true,
    },
  },

  router: {
    middleware: [
      'global/auth',
    ],
  },

  build: {
    extend (config) {
      config.module.rules.push(
        {
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loaders: [ '@kazupon/vue-i18n-loader', 'yaml-loader' ],
        },
      );
    },
  },
};
