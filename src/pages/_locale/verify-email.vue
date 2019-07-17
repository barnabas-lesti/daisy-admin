<template lang="pug">
  v-layout.pages-verify-email(row, wrap, justify-space-around)
    v-flex.mt-4.text-xs-center(xs12)
      h1 {{ $t('title') }}

    v-flex.text-xs-center(xs12)
      .pb-3(v-html="$t('description')")
</template>

<script>
export default {
  name: 'PagesVerifyEmail',
  head () {
    return {
      title: this.$t('title'),
      meta: [ { name: 'description', content: this.$t('description') } ],
    };
  },
  methods: {
    async verifyEmail () {
      this.$nextTick(() => this.$nuxt.$loading.start());
      try {
        await this.$axios.$post('/api/auth/verify-email', { token: this.$route.query['token'] });
        this.$store.commit('notifications/showSuccess', this.$t('verificationSuccessful'));
        this.$router.push({ name: 'locale-sign-in' });
      } catch (ex) {
        const error = ex.response || ex;
        if (error.status === 401) {
          this.$store.commit('notifications/showError', this.$t('invalidToken'));
        } else {
          this.$store.commit('notifications/showError', this.$t('serverError'));
          this.$sentry ? this.$sentry.captureException(error) : console.error(error);
        }
      }
      this.$nextTick(() => this.$nuxt.$loading.finish());
    },
  },
  mounted () {
    this.verifyEmail();
  },
};
</script>

<i18n>
en:
  title: Verify your email address
  description: Please wait while we verify your email address.
  verificationSuccessful: Email verified, please sign in to your account
  invalidToken: Verification failed, invalid token
  serverError: Sorry, an unexpected error occurred
</i18n>
