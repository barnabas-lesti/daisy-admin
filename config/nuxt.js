const {
  NODE_ENV,
  PORT,
  BASE_URL,
  SENTRY_DSN,
} = require('./env');

const isTest = NODE_ENV === 'test';

module.exports = {
  mode: 'universal',
  srcDir: './src',
  loading: '~/components/base/base-loader.vue',

  env: {
    NODE_ENV,
  },

  dev: NODE_ENV === 'development',

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
    treeShake: NODE_ENV === 'production',
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.yml' },
      ...(isTest ? [ { code: 'te', iso: 'te-TE', file: 'te.yml' } ] : []),
    ],
    defaultLocale: 'en',
    vueI18nLoader: true,
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix',
    baseUrl: BASE_URL,
    rootRedirect: 'en',
    detectBrowserLanguage: {
      fallbackLocale: 'en',
    },
    vueI18n: {
      fallbackLocale: isTest ? '' : 'en',
      silentTranslationWarn: isTest,
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
