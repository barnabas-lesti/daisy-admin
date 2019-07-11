const appConfig = require('./app.config');

module.exports = {
  mode: 'universal',
  srcDir: './src',

  loading: '~/components/base/base-loader.vue',

  server: {
    port: appConfig.port,
  },

  dev: !appConfig.isProd,

  head: {
    titleTemplate: '%s | Daisy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },

  env: {
    firebase: appConfig.firebase,
  },

  plugins: [
    'plugins/filters',
    'plugins/firebase',
    'plugins/i18n',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    '@nuxtjs/vuetify',
  ],

  axios: {
    baseURL: appConfig.baseUrl,
  },

  sentry: {
    dsn: appConfig.sentry.dsn,
  },

  vuetify: {
    materialIcons: true,
    treeShake: appConfig.isProd,
  },

  router: {
    middleware: 'i18n',
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
