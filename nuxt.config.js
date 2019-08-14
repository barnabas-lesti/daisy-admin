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
    'plugins/utils',
    'plugins/filters',
    'plugins/logger',
    'plugins/i18n',
    'plugins/auth',
  ],

  modules: [
    '@nuxtjs/sentry',
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    'cookie-universal-nuxt',
  ],

  axios: {
    baseURL: BASE_URL,
  },

  sentry: {
    dsn: SENTRY_DSN,
  },

  vuetify: {
    materialIcons: true,
    treeShake: IS_PRODUCTION,
  },

  router: {
    middleware: [
      'config',
      'auth',
      'i18n',
    ],
  },

  build: {
    extend (config) {
      config.module.rules.push(
        {
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loaders: [
            '@kazupon/vue-i18n-loader',
            'yaml-loader',
          ],
        },
      );
    },
  },
};
