<template lang="pug">
  v-layout.pages-sign-in(
    row,
    wrap,
    justify-space-around,
  )
    v-flex.text-xs-center(xs12)
      h1 {{ $t('pages.signIn.title') }}

    v-flex(
      xs12,
      md8
      lg6,
    )
      v-card
        v-card-text
          v-form(
            ref='form',
            @submit.prevent='signIn()',
          )
            v-layout(wrap)
              v-flex(xs12)
                v-scroll-y-transition
                  .red--text(v-if='serverError') {{ $t(serverError.messageKey) }}
              v-flex(xs12)
                v-text-field(
                  v-model='form.email',
                  :label='$t("pages.signIn.email")',
                  :error='!!serverError',
                  :rules='rules.email',
                  name='email',
                  type='email',
                  append-icon='account_circle',
                )
                v-text-field(
                  v-model='form.password',
                  :label='$t("pages.signIn.password")',
                  :error='!!serverError',
                  :rules='rules.password',
                  name='password',
                  type='password',
                  append-icon='vpn_key',
                )
              v-flex(xs12)
                nuxt-link.d-block(:to='localePath({ name: "register" })') {{ $t('pages.signIn.registrationLink') }}
                nuxt-link.d-block(:to='localePath({ name: "forgot-password" })') {{ $t('pages.signIn.forgotPassword') }}
              v-flex.text-xs-right(xs12)
                v-btn.info.ma-0(
                  type='submit',
                  large,
                ) {{ $t('pages.signIn.submit') }}
</template>

<script>
export default {
  name: 'PagesSignIn',
  middleware: 'signed-out',
  head () {
    return {
      title: this.$t('pages.signIn.title'),
      meta: [ { name: 'description', content: this.$t('pages.signIn.description') } ],
    };
  },
  data () {
    return {
      serverError: null,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          v => !!v || this.$t('pages.signIn.errors.email.required'),
          v => this.$store.state.config.EMAIL_REGEX.test(v) || this.$t('pages.signIn.errors.email.email'),
        ],
        password: [
          v => !!v || this.$t('pages.signIn.errors.password.required'),
        ],
      },
    };
  },
  methods: {
    async signIn () {
      this.serverError = null;
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch('auth/signIn', this.form);
          this.$store.commit('notifications/showSuccess', {
            messageKey: 'pages.signIn.notifications.signInSuccessful',
            payload: { email: this.form.email },
          });
          const ref = this.$route.query['ref'];
          this.$router.push(ref ? { name: ref } : this.localePath({ name: 'index' }));
        } catch ({ type }) {
          this.serverError = { type, messageKey: `pages.signIn.errors.${type}` };
        }
      }
    },
  },
};
</script>
