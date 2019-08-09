<template lang="pug">
  v-layout.pages-register(
    row,
    wrap,
    justify-space-around,
  )
    v-flex.text-xs-center(xs12)
      h1 {{ $t('title') }}

    v-flex(
      xs12,
      md6,
    )
      v-form(
        ref='form',
        @submit.prevent='sendRegistrationEmail()',
      )
        v-layout(wrap)
          v-flex(xs12)
            v-scroll-y-transition
              .red--text(v-if='serverError') {{ serverError }}
          v-flex(xs12)
            v-text-field(
              v-model='form.nickname',
              :label='$t("labels.nickname")',
              :error='!!serverError',
              :rules='rules.nickname',
              name='nickname'
              type='text',
              append-icon='face',
            )
            v-text-field(
              v-model='form.email',
              :label='$t("labels.email")',
              :error='!!serverError',
              :rules='rules.email',
              name='email'
              type='email',
              append-icon='account_circle',
            )
            v-text-field(
              v-model='form.password',
              :label='$t("labels.password")',
              :error='!!serverError',
              :rules='rules.password',
              name='password'
              type='password',
              append-icon='vpn_key',
            )
            v-text-field(
              v-model='form.passwordConfirmation',
              :label='$t("labels.passwordConfirmation")',
              :error='!!serverError',
              :rules='rules.passwordConfirmation',
              name='passwordConfirmation'
              type='password',
              append-icon='vpn_key',
            )
          v-flex(xs12)
            nuxt-link(:to='{ name: "locale-sign-in" }') {{ $t('signInLink') }}
          v-flex.text-xs-right(xs12)
            v-btn.info.ma-0(
              type='submit',
              large,
            ) {{ $t('labels.submit') }}
</template>

<script>
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default {
  name: 'PagesRegister',
  middleware: 'signed-out',
  head () {
    return {
      title: this.$t('title'),
      meta: [ { name: 'description', content: this.$t('description') } ],
    };
  },
  data () {
    return {
      items: [],

      form: {
        nickname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      serverError: '',
      rules: {
        nickname: [
          v => !!v || this.$t('errors.nickname.required'),
          ({ length }) => (length > 6 && length < 22) || this.$t('errors.nickname.between', { min: 6, max: 22 }),
        ],
        email: [
          v => !!v || this.$t('errors.email.required'),
          v => EMAIL_REGEX.test(v) || this.$t('errors.email.email'),
        ],
        password: [
          v => !!v || this.$t('errors.password.required'),
          ({ length }) => (length > 6 && length < 22) || this.$t('errors.password.between', { min: 6, max: 22 }),
        ],
        passwordConfirmation: [
          v => !!v || this.$t('errors.passwordConfirmation.required'),
          v => this.form.password === v || this.$t('errors.passwordConfirmation.sameAs'),
        ],
      },
    };
  },
  methods: {
    async sendRegistrationEmail () {
      if (this.$refs.form.validate()) {
        this.$nuxt.$loading.start();
        this.serverError = '';
        const { email, password, nickname } = this.form;
        const { locale } = this.$store.state.i18n;
        try {
          await this.$axios.$post('/api/auth/send-registration-email', { email, password, nickname, locale });
          this.$refs.form.reset();
          this.$store.commit('notifications/showInfo', { html: this.$t('notifications.registrationEmailSent', { email }) });
          this.$router.push({ name: this.$route.query['ref'] || 'locale' });
        } catch (ex) {
          const error = ex.response || ex;
          if (error.status === 409) this.serverError = this.$t('errors.emailAlreadyInUse');
          else if (error.status === 400) this.serverError = this.$t('errors.badRequest');
          else {
            this.$store.commit('notifications/showError', this.$t('errors.serverError'));
            this.$logger.error(error);
          }
        }
        this.$nuxt.$loading.finish();
      }
    },
    async register (token) {
      this.$nextTick(() => this.$nuxt.$loading.start());
      try {
        await this.$axios.$post('/api/auth/register', { token });
        this.$store.commit('notifications/showSuccess', { html: this.$t('notifications.registrationSuccessful') });
        this.$router.push({ name: 'locale-sign-in' });
      } catch (ex) {
        const error = ex.response || ex;
        if (error.status === 401 || error.status === 400) this.$store.commit('notifications/showError', this.$t('errors.tokenInvalid'));
        else if (error.status === 409) this.$store.commit('notifications/showError', this.$t('errors.emailAlreadyInUse')); else {
          this.$store.commit('notifications/showError', this.$t('errors.serverError'));
          this.$logger.error(error);
        }
        this.$utils.pushRouteQuery({ 'token': undefined });
      }
      this.$nuxt.$loading.finish();
    },
  },
  mounted () {
    const token = this.$route.query['token'];
    if (token) this.register(token);
  },
};
</script>

<i18n>
en:
  title: Register
  description: Register an account to access the cool features of Daisy
  signInLink: Already have an account? Sign in!
  labels:
    nickname: Nickname
    email: Email
    password: Password
    passwordConfirmation: Confirm your password
    submit: Register
  notifications:
    registrationEmailSent: "Registration email sent to <strong>{email}</strong>, please check your inbox"
    registrationSuccessful: Registration successful, please sign in
  errors:
    emailAlreadyInUse: Email already in use
    serverError: Sorry, an unexpected error occurred
    tokenInvalid: Token invalid, maybe you waited for too long?
    badRequest: Some information is invalid, is the email address valid?
    nickname:
      required: Nickname is required
      between: Nickname must be between {min} and {max} characters
    email:
      required: Email is required
      email: Email format is invalid
    password:
      required: Password is required
      between: Password must be between {min} and {max} characters
    passwordConfirmation:
      required: Password confirmation is required
      sameAs: Passwords must match
</i18n>
