<template lang="pug">
  v-dialog.base-modal(:value='value', :fullscreen='$vuetify.breakpoint.smAndDown',
    :hide-overlay='$vuetify.breakpoint.smAndDown', :max-width="$vuetify.breakpoint.smAndDown ? 'none' : '400px'",
    transition='dialog-bottom-transition', lazy, @input="$emit('input', $event)")
    v-card.pa-3
      v-card-title
        .headline {{ $t('title') }}
      v-card-text
        v-form(@submit.prevent='onSubmit()')
          v-layout(wrap)
            v-flex.mb-2(xs12)
              .red--text(v-for='error of serverErrors', :key='error') {{ error }}
            v-flex(xs12)
              v-text-field(v-model='$v.form.email.$model', :label="$t('email')", :error='!!serverErrors.length',
                :error-messages="fieldErrors.email", type='email', append-icon='account_circle', @change='updateEmailErrors()')
            v-flex.mb-2(xs12)
              v-text-field(v-model='$v.form.password.$model', :error='!!serverErrors.length', :error-messages="fieldErrors.password",
                :label="$t('password')", type='password', append-icon='vpn_key', @change='updatePasswordErrors()')
            v-flex.mb-4(xs12)
              nuxt-link(:to="{ name: 'locale-register' }") {{ $t('registrationLink') }}
            v-flex.text-xs-right(xs12)
              v-btn.ma-0.mr-3(large, flat, @click="$emit('cancel')") {{ $t('cancel') }}
              v-btn.info.ma-0(type='submit', large) {{ $t('button') }}
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'LayoutSignInModal',
  mixins: [ validationMixin ],
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    serverErrors: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      form: {
        email: '',
        password: '',
      },
      fieldErrors: {
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
  methods: {
    reset () {
      this.form.email = this.form.password = '';
      this.$v.$reset();
    },
    onSubmit () {
      this.$v.form.$touch();
      this.updateErrors();
      if (!this.$v.form.$anyError) {
        this.$emit('submit', this.form);
        this.$v.$reset();
      }
    },
    updateEmailErrors () {
      const { email } = this.$v.form;
      this.fieldErrors.email = email.$dirty ? [
        ...(email.required ? [] : [this.$t('errors.email.required')]),
        ...(email.email ? [] : [this.$t('errors.email.email')]),
      ] : [];
    },
    updatePasswordErrors () {
      const { password } = this.$v.form;
      this.fieldErrors.password = password.$dirty ? [ ...(password.required ? [] : [this.$t('errors.password.required')]) ] : [];
    },
    updateErrors () {
      this.updateEmailErrors();
      this.updatePasswordErrors();
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
  errors:
    email:
      required: Email is required
      email: Email format is invalid
    password:
      required: Password is required
</i18n>
