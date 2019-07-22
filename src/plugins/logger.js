import consola from 'consola';
import Vue from 'vue';

class Logger {
  constructor ($sentry) {
    this.$sentry = $sentry;
  }

  error (error, ...options) {
    this.$sentry && this.$sentry.captureException(error);
    consola.error({ message: error, ...options });
  }
}

export default (context) => {
  Vue.prototype.$logger = context.$logger = new Logger(context.app.$sentry);
};
