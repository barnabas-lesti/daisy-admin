<template lang="pug">
  v-layout.pages-register(row, wrap, justify-space-around)
    v-flex.mt-4(xs12).text-xs-center
      h1 {{ $t('title') }}

    v-flex(xs12).text-xs-center
      .pb-3(v-html="$t('descriptionHtml')")

    v-flex(shrink)
      v-card.pages-register_card.pa-3
        v-card-text
          v-form(@submit.prevent='register()')
            v-layout(wrap)
              v-flex.mb-2(xs12)
                .red--text(v-for='error of serverErrors', :key='error') {{ error }}
              v-flex(xs12)
                v-text-field(v-model='$v.form.email.$model', :label="$t('email')", :error='!!serverErrors.length',
                  :error-messages='fieldErrors.email', type='email' append-icon='account_circle', @change='updateEmailErrors()')
              v-flex(xs12)
                v-text-field(v-model='$v.form.password.$model', :label="$t('password')", :error='!!serverErrors.length',
                  :error-messages='fieldErrors.password', type='password', append-icon='vpn_key', @change='updatePasswordErrors()')
              v-flex.mb-2(xs12)
                v-text-field(v-model='$v.form.passwordConfirmation.$model', :label="$t('passwordConfirmation')", :error='!!serverErrors.length',
                  :error-messages='fieldErrors.passwordConfirmation', type='password' append-icon='vpn_key', @change='updatePasswordConfirmationErrors()')
              v-flex.mb-4(xs12)
                nuxt-link(:to="{ query: { 'sign-in': true } }") {{ $t('signInLink') }}
              v-flex.text-xs-right(xs12)
                v-btn.info.ma-0(type='submit', large) {{ $t('button') }}
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'PagesRegister',
  mixins: [ validationMixin ],
  head () {
    return {
      title: this.$t('title'),
      meta: [ { name: 'description', content: this.$t('description') } ],
    };
  },
  data () {
    return {
      form: {
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      fieldErrors: {
        email: [],
        password: [],
        passwordConfirmation: [],
      },
      serverErrors: [],
    };
  },
  validations () {
    return {
      form: {
        email: { required, email },
        password: { required, minLength: minLength(6), maxLength: maxLength(22) },
        passwordConfirmation: { required, sameAs: sameAs(model => model.password) },
      },
    };
  },
  methods: {
    updateEmailErrors () {
      const { email } = this.$v.form;
      this.fieldErrors.email = email.$dirty ? [
        ...(email.required ? [] : [this.$t('errors.email.required')]),
        ...(email.email ? [] : [this.$t('errors.email.email')]),
      ] : [];
    },
    updatePasswordErrors () {
      const { password } = this.$v.form;
      this.fieldErrors.password = password.$dirty ? [
        ...(password.required ? [] : [this.$t('errors.password.required')]),
        ...(password.minLength && password.maxLength ? [] : [this.$t('errors.password.length',
          { min: password.$params.minLength.min, max: password.$params.maxLength.max })]),
      ] : [];
    },
    updatePasswordConfirmationErrors () {
      const { passwordConfirmation } = this.$v.form;
      this.fieldErrors.passwordConfirmation = passwordConfirmation.$dirty ? [
        ...(passwordConfirmation.required ? [] : [this.$t('errors.passwordConfirmation.required')]),
        ...(passwordConfirmation.sameAs ? [] : [this.$t('errors.passwordConfirmation.sameAs')]),
      ] : [];
    },
    updateErrors () {
      this.updateEmailErrors();
      this.updatePasswordErrors();
      this.updatePasswordConfirmationErrors();
    },
    async register () {
      this.$nuxt.$loading.start();
      this.$v.form.$touch();
      this.updateErrors();
      if (!this.$v.form.$anyError) {
        this.$v.$reset();
        this.serverErrors.splice(0);
        const { email, password } = this.form;
        try {
          await this.$firebase.auth().createUserWithEmailAndPassword(email, password);
          this.form.email = this.form.password = this.form.passwordConfirmation = '';
          this.$store.commit('notifications/showInfo', { html: this.$t('notifications.registrationSuccessful', { email }) });
          this.$router.push({ name: 'locale' });
        } catch (ex) {
          if (ex.code === 'auth/email-already-in-use') {
            this.serverErrors.splice(0, 1, this.$t('errors.emailTaken'));
          } else {
            this.$store.commit('notifications/showError', this.$t('errors.serverError'));
            this.$sentry ? this.$sentry.captureException(ex) : console.error(ex);
          }
        }
        this.$nuxt.$loading.finish();
      }
    },
  },
};
</script>

<style lang="stylus">
.pages-register
  &_card
    max-width: 600px;

</style>

<i18n>
en:
  title: Register
  description: Register an account to access the cool features of Daisy!
  descriptionHtml: "Register an account to access the cool features of <strong>Daisy</strong>!"
  email: Email
  password: Password
  passwordConfirmation: Confirm your password
  button: Register
  signInLink: Already have an account? Sign in!
  notifications:
    registrationSuccessful: Registration successful, signed in as <strong>{email}</strong>
  errors:
    emailTaken: Email already in use
    serverError: Sorry, an unexpected error occurred
    email:
      required: Email is required
      email: Email format is invalid
      taken: Email already in use
    password:
      required: Password is required
      length: Password must be between {min} and {max} characters
    passwordConfirmation:
      required: Password confirmation is required
      sameAs: Passwords must match
</i18n>
