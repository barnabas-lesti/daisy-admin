<template lang="pug">
  v-layout.pages-forgot-password(
    row,
    wrap,
    justify-space-around,
  )
    v-flex.text-xs-center(xs12)
      h1 {{ $t('pages.forgotPassword.title') }}

    v-flex(
      xs12,
      md8
      lg6,
    )
      v-card
        v-card-text
          v-form(
            v-if='token'
            ref='resetPasswordForm',
            @submit.prevent='resetPassword()',
          )
            v-layout(wrap)
              v-flex(xs12)
                v-scroll-y-transition
                  .red--text(v-if='serverError') {{ $t(serverError.messageKey) }}
              v-flex(xs12)
                v-text-field(
                  v-model='resetPasswordForm.password',
                  :label='$t("pages.forgotPassword.password")',
                  :error='!!serverError',
                  :rules='rules.password',
                  name='password',
                  type='password',
                  append-icon='vpn_key',
                )
                v-text-field(
                  v-model='resetPasswordForm.passwordConfirmation',
                  :label='$t("pages.forgotPassword.passwordConfirmation")',
                  :error='!!serverError',
                  :rules='rules.passwordConfirmation',
                  name='passwordConfirmation',
                  type='password',
                  append-icon='vpn_key',
                )
              v-flex.text-xs-right(xs12)
                v-btn.info.ma-0(
                  type='submit',
                  large,
                ) {{ $t('pages.forgotPassword.resetPasswordFormSubmit') }}
          v-form(
            v-else
            ref='emailForm',
            @submit.prevent='sendPasswordResetEmail()',
          )
            v-layout(wrap)
              v-flex(xs12)
                v-scroll-y-transition
                  .red--text(v-if='serverError') {{ $t(serverError.messageKey) }}
              v-flex(xs12)
                v-text-field(
                  v-model='emailForm.email',
                  :label='$t("pages.forgotPassword.email")',
                  :error='!!serverError',
                  :rules='rules.email',
                  name='email',
                  type='email',
                  append-icon='account_circle',
                )
              v-flex.text-xs-right(xs12)
                v-btn.info.ma-0(
                  type='submit',
                  large,
                ) {{ $t('pages.forgotPassword.emailFormSubmit') }}
</template>

<script>
export default {
  name: 'PagesVerifyEmail',
  middleware: 'signed-out',
  head () {
    return {
      title: this.$t('pages.forgotPassword.title'),
      meta: [ { name: 'description', content: this.$t('pages.forgotPassword.description') } ],
    };
  },
  data () {
    return {
      serverError: null,
      emailForm: {
        email: '',
      },
      resetPasswordForm: {
        password: '',
        passwordConfirmation: '',
      },
      rules: {
        email: [
          v => !!v || this.$t('pages.forgotPassword.errors.email.required'),
          v => this.$store.state.config.EMAIL_REGEX.test(v) || this.$t('pages.register.errors.email.email'),
        ],
        password: [
          v => !!v || this.$t('pages.forgotPassword.errors.password.required'),
          (v = '') => (v.length >= 6 && v.length <= 22) || this.$t('pages.forgotPassword.errors.password.between', { min: 6, max: 22 }),
        ],
        passwordConfirmation: [
          v => !!v || this.$t('pages.forgotPassword.errors.passwordConfirmation.required'),
          v => this.resetPasswordForm.password === v || this.$t('pages.forgotPassword.errors.passwordConfirmation.sameAs'),
        ],
      },
    };
  },
  computed: {
    token () { return this.$route.query['token']; },
  },
  methods: {
    async resetPassword () {
      this.serverError = null;
      if (this.$refs.resetPasswordForm.validate()) {
        const { password } = this.resetPasswordForm;
        try {
          await this.$store.dispatch('auth/resetPassword', { token: this.token, password });
          this.$store.commit('notifications/showSuccess', {
            messageKey: 'pages.forgotPassword.notifications.resetSuccessful',
          });
          this.$router.push(this.localePath({ name: 'sign-in' }));
        } catch ({ type }) {
          this.serverError = { type, messageKey: `pages.forgotPassword.errors.${type}` };
        }
      }
    },
    async sendPasswordResetEmail () {
      this.serverError = null;
      if (this.$refs.emailForm.validate()) {
        const { email } = this.emailForm;
        try {
          await this.$store.dispatch('auth/sendPasswordResetEmail', { email });
          this.$store.commit('notifications/showSuccess', {
            messageKey: 'pages.forgotPassword.notifications.passwordResetEmailSent',
            payload: { email },
          });
        } catch ({ type }) {
          this.serverError = { type, messageKey: `pages.forgotPassword.errors.${type}` };
        }
      }
    },
  },
};
</script>
