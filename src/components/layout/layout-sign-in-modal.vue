<template lang="pug">
  v-dialog.base-modal(v-model='isOpen', :fullscreen='$vuetify.breakpoint.smAndDown',
    :hide-overlay='$vuetify.breakpoint.smAndDown', :max-width="$vuetify.breakpoint.smAndDown ? 'none' : '400px'",
    transition='dialog-bottom-transition', lazy)
    v-card.pa-3
      v-card-title
        .headline {{ $t('title') }}
      v-card-text
        v-form(@submit.prevent='signIn()')
          v-layout(wrap)
            v-flex(xs12)
              v-text-field(v-model='$v.form.email.$model', :label="$t('email')", :error-messages="errors.email", type='email',
                append-icon='account_circle', @change='updateEmailErrors()')
            v-flex.mb-4(xs12)
              v-text-field(v-model='$v.form.password.$model', :error-messages="errors.password", :label="$t('password')",
                type='password', append-icon='vpn_key', @change='updatePasswordErrors()')
            v-flex.mb-4(xs12)
              nuxt-link(:to="{ name: 'locale-register' }") {{ $t('registrationLink') }}
            v-flex.text-xs-right(xs12)
              v-btn.ma-0.mr-3(large, flat, @click='close()') {{ $t('cancel') }}
              v-btn.info.ma-0(type='submit', large) {{ $t('button') }}
</template>

<script>
import { mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'LayoutSignInModal',
  mixins: [ validationMixin ],
  data () {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: {
        email: [],
        password: [],
      },
    };
  },
  validations: {
    form: {
      email: { required, email },
      password: { required },
    },
  },
  computed: {
    ...mapState([ 'isLoading' ]),
    ...mapState('user', [ 'user' ]),

    isOpen: {
      get () { return !this.user && this.$route.query['sign-in']; },
      set (newValue) { this.$utils.pushRouteQuery({ 'sign-in': newValue || undefined }); },
    },
  },
  methods: {
    updateEmailErrors () {
      const { email } = this.$v.form;
      this.errors.email = email.$dirty ? [
        ...(email.required ? [] : [this.$t('errors.email.required')]),
        ...(email.email ? [] : [this.$t('errors.email.email')]),
      ] : [];
    },
    updatePasswordErrors () {
      const { password } = this.$v.form;
      this.errors.password = password.$dirty ? [ ...(password.required ? [] : [this.$t('errors.password.required')]) ] : [];
    },
    updateErrors () {
      this.updateEmailErrors();
      this.updatePasswordErrors();
    },
    close () { this.isOpen = false; },
    async signIn () {
      this.$v.form.$touch();
      this.updateErrors();
      if (!this.$v.form.$anyError) {
        this.$store.commit('startLoading');
        try {
          const { user: { email } } = await this.$firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password);
          console.log(email);
          this.isOpen = false;
          this.form.email = this.form.password = '';
          this.$v.$reset();
          this.$store.commit('notifications/showInfo', { html: this.$t('notifications.signIn', { email }) });
        } catch (ex) {
          if (ex.code === 'auth/wrong-password' || ex.code === 'auth/user-not-found') {
            this.errors.email = [this.$t('errors.email.authenticationFailed')];
          } else {
            this.$store.commit('notifications/showError', this.$t('notifications.serverError'));
            this.$sentry ? this.$sentry.captureException(ex) : console.error(ex);
          }
        }
        this.$store.commit('finishLoading');
      }
    },
  },
};
</script>

<i18n>
en:
  title: Sign in
  email: Email
  password: Password
  button: Sign in
  cancel: Cancel
  registrationLink: Don't have an account? Register!
  notifications:
    signIn: "Signed in as <strong>{email}</strong>."
    serverError: Sorry, something went wrong
  errors:
    email:
      required: Email is required
      email: Email format is invalid
      authenticationFailed: Sign in failed, invalid credentials
    password:
      required: Password is required
</i18n>
