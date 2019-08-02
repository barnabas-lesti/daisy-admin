<template lang="pug">
  v-layout.pages-profile(row, wrap, justify-space-around)
    v-flex.mt-4.text-xs-center(xs12)
      h1 {{ $t('title') }}

    v-flex.text-xs-center(xs12)
      .pb-3(v-html="$t('descriptionHtml')")

    v-flex(xs12)
      //- v-text-field(v-model='$v.form.email.$model', :label="$t('email')", :error='!!serverErrors.length',
      //-   :error-messages='fieldErrors.email', type='email' append-icon='account_circle', readonly, @change='updateEmailErrors()')
      v-text-field(v-model='$v.form.nickname.$model', :label="$t('nickname')", :error='!!serverErrors.length',
        :error-messages='fieldErrors.nickname', type='text' @change='updateNicknameErrors()')
      v-text-field(v-model='$v.form.password.$model', :label="$t('password')", :error='!!serverErrors.length',
        :error-messages='fieldErrors.password', type='password', @change='updatePasswordErrors()')
      v-text-field(v-model='$v.form.passwordConfirmation.$model', :label="$t('passwordConfirmation')", :error='!!serverErrors.length',
        :error-messages='fieldErrors.passwordConfirmation', type='password' @change='updatePasswordConfirmationErrors()')

    //- v-flex(shrink)
    //-   v-card.pages-register_card.pa-3
    //-     v-card-text
    //-       v-form(@submit.prevent='sendRegistrationEmail()')
    //-         v-layout(wrap)
    //-           v-flex.py-0(xs12)
    //-             v-scroll-y-transition(group)
    //-               .red--text.mt-2(v-for='error of serverErrors', :key='error') {{ error }}
    //-           v-flex(xs12)
    //-             v-text-field(v-model='$v.form.nickname.$model', :label="$t('nickname')", :error='!!serverErrors.length',
    //-               :error-messages='fieldErrors.nickname', type='text' append-icon='face', @change='updateNicknameErrors()')
    //-             v-text-field(v-model='$v.form.email.$model', :label="$t('email')", :error='!!serverErrors.length',
    //-               :error-messages='fieldErrors.email', type='email' append-icon='account_circle', @change='updateEmailErrors()')
    //-             v-text-field(v-model='$v.form.password.$model', :label="$t('password')", :error='!!serverErrors.length',
    //-               :error-messages='fieldErrors.password', type='password', append-icon='vpn_key', @change='updatePasswordErrors()')
    //-             v-text-field(v-model='$v.form.passwordConfirmation.$model', :label="$t('passwordConfirmation')", :error='!!serverErrors.length',
    //-               :error-messages='fieldErrors.passwordConfirmation', type='password' append-icon='vpn_key', @change='updatePasswordConfirmationErrors()')
    //-           v-flex(xs12)
    //-             nuxt-link(:to="{ name: 'locale-sign-in' }") {{ $t('signInLink') }}
    //-           v-flex.text-xs-right(xs12)
    //-             v-btn.info.ma-0(type='submit', large) {{ $t('button') }}
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'PagesProfile',
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
        nickname: '',
        password: '',
        passwordConfirmation: '',
      },
      fieldErrors: {
        nickname: [],
        password: [],
        passwordConfirmation: [],
      },
      serverErrors: [],
    };
  },
  validations () {
    return {
      form: {
        nickname: { required },
        password: { required, minLength: minLength(6), maxLength: maxLength(22) },
        passwordConfirmation: { required, sameAs: sameAs(model => model.password) },
      },
    };
  },
  methods: {
    updateNicknameErrors () {
      const { nickname } = this.$v.form;
      this.fieldErrors.nickname = nickname.$dirty ? [
        ...(nickname.required ? [] : [this.$t('errors.nickname.required')]),
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
.pages-profile
  &_todo
    color red

</style>

<i18n>
en:
  title: Profile
  description: Here you can update your profile information and change your password
  descriptionHtml: Here you can update your profile information and change your password.
  nickname: Nickname
  password: Password
  passwordConfirmation: Confirm your password
  errors:
    serverError: Sorry, an unexpected error occurred
    badRequest: Some information is invalid, is the email address valid?
    nickname:
      required: Nickname is required
    password:
      required: Password is required
      length: Password must be between {min} and {max} characters
    passwordConfirmation:
      required: Password confirmation is required
      sameAs: Passwords must match
</i18n>
