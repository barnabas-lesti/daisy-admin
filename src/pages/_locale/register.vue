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
              v-flex(xs12)
                v-text-field(v-model='$v.model.email.$model', :label="$t('email')", :error-messages='errors.email', type='email',
                  append-icon='account_circle')
              v-flex(xs12)
                v-text-field(v-model='$v.model.password.$model', :label="$t('password')", :error-messages='errors.password',
                  type='password', append-icon='vpn_key')
              v-flex(xs12)
                v-text-field(v-model='$v.model.passwordConfirmation.$model', :label="$t('passwordConfirmation')", :error-messages='errors.passwordConfirmation',
                  type='password' append-icon='vpn_key')
              v-flex.mb-4(xs12)
                //- nuxt-link(:to="{ name: 'locale-signIn' }") {{ $t('signInLink') }}
              v-flex.text-xs-right(xs12)
                v-btn.info.ma-0(type='submit', large) {{ $t('button') }}
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'PagesIndex',
  mixins: [ validationMixin ],
  head () {
    return {
      title: this.$t('title'),
      meta: [ { name: 'description', content: this.$t('description') } ],
    };
  },
  data () {
    return {
      model: {
        email: '',
        password: '',
        passwordConfirmation: '',
      },
    };
  },
  validations () {
    return {
      model: {
        email: { required, email },
        password: { required, minLength: minLength(6), maxLength: maxLength(22) },
        passwordConfirmation: { required, sameAs: sameAs(model => model.password) },
      },
    };
  },
  computed: {
    errors () {
      const { email, password, passwordConfirmation } = this.$v.model;
      console.log(this.$v.model.$anyError);
      return this.$v.model.$anyError ? {
        email: [
          ...(email.required ? [] : [this.$t('errors.email.required')]),
          ...(email.email ? [] : [this.$t('errors.email.email')]),
        ],
        password: [
          ...(password.required ? [] : [this.$t('errors.password.required')]),
          ...(password.minLength && password.maxLength ? [] : [this.$t('errors.password.length',
            { min: password.$params.minLength.min, max: password.$params.maxLength.max })]),
        ],
        passwordConfirmation: [
          ...(passwordConfirmation.required ? [] : [this.$t('errors.passwordConfirmation.required')]),
          ...(passwordConfirmation.sameAs ? [] : [this.$t('errors.passwordConfirmation.sameAs')]),
        ],
      } : null;
    },
  },
  methods: {
    register () {

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
  errors:
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
