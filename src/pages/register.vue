<template lang="pug">
  v-layout.pages-register(
    row,
    wrap,
    justify-space-around,
  )
    | {{ $t('common.test') }}
    v-flex.text-xs-center(xs12)
      h1 {{ $t('pages.register.title') }}

    v-flex(
      xs12,
      md8
      lg6,
    )
      v-card
        v-card-text
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
                  :label='$t("pages.register.labels.nickname")',
                  :error='!!serverError',
                  :rules='rules.nickname',
                  name='nickname'
                  type='text',
                  append-icon='face',
                )
                v-text-field(
                  v-model='form.email',
                  :label='$t("pages.register.labels.email")',
                  :error='!!serverError',
                  :rules='rules.email',
                  name='email'
                  type='email',
                  append-icon='account_circle',
                )
                v-text-field(
                  v-model='form.password',
                  :label='$t("pages.register.labels.password")',
                  :error='!!serverError',
                  :rules='rules.password',
                  name='password'
                  type='password',
                  append-icon='vpn_key',
                )
                v-text-field(
                  v-model='form.passwordConfirmation',
                  :label='$t("pages.register.labels.passwordConfirmation")',
                  :error='!!serverError',
                  :rules='rules.passwordConfirmation',
                  name='passwordConfirmation'
                  type='password',
                  append-icon='vpn_key',
                )
              v-flex(xs12)
                nuxt-link(:to='localePath({ name: "sign-in" })') {{ $t('pages.register.signInLink') }}
              v-flex.text-xs-right(xs12)
                v-btn.info.ma-0(
                  type='submit',
                  large,
                ) {{ $t('pages.register.labels.submit') }}
</template>

<script>
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default {
  name: 'PagesRegister',
  middleware: 'local/signed-out',
  head () {
    return {
      title: this.$t('pages.register.title'),
      meta: [ { name: 'description', content: this.$t('pages.register.description') } ],
    };
  },
  data () {
    return {
      form: {
        nickname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      serverError: '',
      rules: {
        nickname: [
          v => !!v || this.$t('pages.register.errors.nickname.required'),
          ({ length }) => (length >= 6 && length <= 22) || this.$t('pages.register.errors.nickname.between', { min: 6, max: 22 }),
        ],
        email: [
          v => !!v || this.$t('pages.register.errors.email.required'),
          v => EMAIL_REGEX.test(v) || this.$t('pages.register.errors.email.email'),
        ],
        password: [
          v => !!v || this.$t('pages.register.errors.password.required'),
          ({ length }) => (length >= 6 && length <= 22) || this.$t('pages.register.errors.password.between', { min: 6, max: 22 }),
        ],
        passwordConfirmation: [
          v => !!v || this.$t('pages.register.errors.passwordConfirmation.required'),
          v => this.form.password === v || this.$t('pages.register.errors.passwordConfirmation.sameAs'),
        ],
      },
    };
  },
  methods: {
    async sendRegistrationEmail () {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch('auth/sendRegistrationEmail', this.form);
          this.$refs.form.reset();
          this.$router.push({ name: this.$route.query['ref'] || 'index' });
        } catch ({ errorMessage }) {
          this.serverError = errorMessage;
        }
      }
    },
    async register (token) {
      this.$nextTick(() => this.$nuxt.$loading.start());
      try {
        await this.$axios.$post('/api/auth/register', { token });
        this.$store.commit('notifications/showSuccess', { html: this.$t('pages.register.notifications.registrationSuccessful') });
        this.$router.push(this.localePath({ name: 'sign-in' }));
      } catch (ex) {
        const error = ex.response || ex;
        if (error.status === 401 || error.status === 400) this.$store.commit('notifications/showError', this.$t('pages.register.errors.tokenInvalid'));
        else if (error.status === 409) this.$store.commit('notifications/showError', this.$t('pages.register.errors.emailAlreadyInUse')); else {
          this.$store.commit('notifications/showError', this.$t('pages.register.errors.serverError'));
          this.$logger.error(error);
        }
        this.pushRouteQuery({ 'token': undefined });
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
