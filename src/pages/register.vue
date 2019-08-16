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
                nuxt-link(:to='localePath({ name: "sign-in" })') {{ $t('signInLink') }}
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
  middleware: 'local/signed-out',
  head () {
    return {
      title: this.$t('title'),
      meta: [ { name: 'description', content: this.$t('description') } ],
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
          v => !!v || this.$t('errors.nickname.required'),
          ({ length }) => (length >= 6 && length <= 22) || this.$t('errors.nickname.between', { min: 6, max: 22 }),
        ],
        email: [
          v => !!v || this.$t('errors.email.required'),
          v => EMAIL_REGEX.test(v) || this.$t('errors.email.email'),
        ],
        password: [
          v => !!v || this.$t('errors.password.required'),
          ({ length }) => (length >= 6 && length <= 22) || this.$t('errors.password.between', { min: 6, max: 22 }),
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
        this.$store.commit('notifications/showSuccess', { html: this.$t('notifications.registrationSuccessful') });
        this.$router.push(this.localePath({ name: 'sign-in' }));
      } catch (ex) {
        const error = ex.response || ex;
        if (error.status === 401 || error.status === 400) this.$store.commit('notifications/showError', this.$t('errors.tokenInvalid'));
        else if (error.status === 409) this.$store.commit('notifications/showError', this.$t('errors.emailAlreadyInUse')); else {
          this.$store.commit('notifications/showError', this.$t('errors.serverError'));
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
