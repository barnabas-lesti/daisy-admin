const appConfig = require('./app.config');

module.exports = {
  mode: 'universal',
  srcDir: './src',

  loading: '~/components/base/base-loader.vue',

  server: {
    port: appConfig.PORT,
  },

  dev: !appConfig.IS_PRODUCTION,

  head: {
    titleTemplate: '%s | Daisy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },

  plugins: [
    'plugins/filters',
    'plugins/i18n',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    '@nuxtjs/vuetify',
  ],

  axios: {
    baseURL: appConfig.BASE_URL,
  },

  sentry: {
    dsn: appConfig.SENTRY_DSN,
  },

  vuetify: {
    materialIcons: true,
    treeShake: true,
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
