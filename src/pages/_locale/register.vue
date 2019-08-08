<template lang="pug">
  v-layout.pages-register(row, wrap, justify-space-around)
    v-flex.mt-4.text-xs-center(xs12)
      h1 {{ $t('title') }}

    v-flex.text-xs-center(xs12)
      .pb-3(v-html="$t('descriptionHtml')")

    v-flex(shrink)
      v-card.pages-register_card.pa-3
        v-card-text
          v-form(ref='form', @submit.prevent='sendRegistrationEmail()')
            v-layout(wrap)
              v-flex.py-0(xs12)
                v-scroll-y-transition(group)
                  .red--text.mt-2(v-for='error of serverErrors', :key='error') {{ error }}
              v-flex(xs12)
                v-text-field(v-model='form.nickname', :label="$t('nickname')", :error='!!serverErrors.length',
                  :rules='rules.nickname', type='text',
                  append-icon='face')
                v-text-field(v-model='form.email', :label="$t('email')", :error='!!serverErrors.length',
                  :rules='rules.email', type='email' append-icon='account_circle')
                v-text-field(v-model='form.password', :label="$t('password')",
                  :error='!!serverErrors.length', :rules='rules.password', type='password',
                  append-icon='vpn_key')
                v-text-field(v-model='form.passwordConfirmation',
                  :label="$t('passwordConfirmation')", :error='!!serverErrors.length', :rules='rules.passwordConfirmation',
                  type='password', append-icon='vpn_key')
              v-flex(xs12)
                nuxt-link(:to="{ name: 'locale-sign-in' }") {{ $t('signInLink') }}
              v-flex.text-xs-right(xs12)
                v-btn.info.ma-0(type='submit', large) {{ $t('button') }}
</template>

<script>
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
    const { required, email, sameAs } = this.$validators;
    return {
      rules: {
        nickname: [
          required(this.$t('errors.nickname.required')),
        ],
        email: [
          required(this.$t('errors.email.required')),
          email(this.$t('errors.email.email')),
        ],
        password: [
          required(this.$t('errors.password.required')),
        ],
        passwordConfirmation: [
          required(this.$t('errors.passwordConfirmation.required')),
          // sameAs(this.form.password, this.$t('errors.passwordConfirmation.sameAs')),
        ],
      },
      form: {
        nickname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      serverErrors: [],
    };
  },
  methods: {
    async sendRegistrationEmail () {
      // this.$refs.form.reset();
      console.log(this.$refs.form.validate());
      // this.$v.form.$touch();
      // this.updateErrors();
      // if (!this.$v.form.$anyError) {
      //   this.$nuxt.$loading.start();
      //   this.$v.$reset();
      //   this.serverErrors.splice(0);
      //   const { email, password, nickname } = this.form;
      //   const { locale } = this.$store.state.i18n;
      //   try {
      //     await this.$axios.$post('/api/auth/send-registration-email', { email, password, nickname, locale });
      //     this.form.nickname = this.form.email = this.form.password = this.form.passwordConfirmation = '';
      //     this.$store.commit('notifications/showInfo', { html: this.$t('notifications.registrationEmailSent', { email }) });
      //     this.$router.push({ name: this.$route.query['ref'] || 'locale' });
      //   } catch (ex) {
      //     const error = ex.response || ex;
      //     if (error.status === 409) {
      //       this.serverErrors.splice(0, 1, this.$t('errors.emailAlreadyInUse'));
      //     } else if (error.status === 400) {
      //       this.serverErrors.splice(0, 1, this.$t('errors.badRequest'));
      //     } else {
      //       this.$store.commit('notifications/showError', this.$t('errors.serverError'));
      //       this.$logger.error(error);
      //     }
      //   }
      //   this.$nuxt.$loading.finish();
      // }
    },
    async register (token) {
      this.$nextTick(() => this.$nuxt.$loading.start());
      try {
        await this.$axios.$post('/api/auth/register', { token });
        this.$store.commit('notifications/showSuccess', { html: this.$t('notifications.registrationSuccessful') });
        this.$router.push({ name: 'locale-sign-in' });
      } catch (ex) {
        const error = ex.response || ex;
        if (error.status === 401 || error.status === 400) {
          this.$store.commit('notifications/showError', this.$t('errors.tokenInvalid'));
        } else if (error.status === 409) {
          this.$store.commit('notifications/showError', this.$t('errors.emailAlreadyInUse'));
        } else {
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
    if (token) {
      this.register(token);
    }
  },
};
</script>

<style lang="stylus">
.pages-register
  &_card
    max-width 600px

</style>

<i18n>
en:
  title: Register
  description: Register an account to access the cool features of Daisy!
  descriptionHtml: "Register an account to access the cool features of <strong>Daisy</strong>!"
  nickname: Nickname
  email: Email
  password: Password
  passwordConfirmation: Confirm your password
  button: Register
  signInLink: Already have an account? Sign in!
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
    email:
      required: Email is required
      email: Email format is invalid
    password:
      required: Password is required
      length: Password must be between {min} and {max} characters
    passwordConfirmation:
      required: Password confirmation is required
      sameAs: Passwords must match
</i18n>
