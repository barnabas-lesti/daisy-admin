<template lang="pug">
  v-layout.pages-profile(row, wrap, justify-space-around)
    v-flex.mt-4.text-xs-center(xs12)
      h1 {{ $t('title') }}

    v-flex(xs12)
      v-form(@submit.prevent='updateProfile()')
        v-layout(wrap)
          v-flex.py-0(xs12)
            v-text-field(v-model='$v.profileForm.nickname.$model', :label="$t('nickname')",
              :error-messages='fieldErrors.nickname', type='text' @change='updateNicknameErrors()')
          v-flex.text-xs-right(xs12)
            v-btn.info.ma-0(type='submit', large) {{ $t('updateProfile') }}

    v-flex(xs12)
      v-form(@submit.prevent='changePassword()')
        v-layout(wrap)
          v-flex.py-0(xs12)
            v-text-field(v-model='$v.passwordForm.password.$model', :label="$t('password')",
              :error-messages='fieldErrors.password',
              type='password', @change='updatePasswordErrors()')
          v-flex.py-0(xs12)
            v-text-field(v-model='$v.passwordForm.passwordConfirmation.$model', :label="$t('passwordConfirmation')",
              :error-messages='fieldErrors.passwordConfirmation',
              type='password' @change='updatePasswordConfirmationErrors()')
          v-flex.text-xs-right(xs12)
            v-btn.info.ma-0(type='submit', large) {{ $t('changePassword') }}
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'PagesProfile',
  mixins: [ validationMixin ],
  middleware: 'signed-in',
  head () {
    return {
      title: this.$t('title'),
      meta: [ { name: 'description', content: this.$t('description') } ],
    };
  },
  data () {
    return {
      profileForm: {
        nickname: '',
      },
      passwordForm: {
        password: '',
        passwordConfirmation: '',
      },
      fieldErrors: {
        nickname: [],
        password: [],
        passwordConfirmation: [],
      },
    };
  },
  validations () {
    return {
      profileForm: {
        nickname: { required },
      },
      passwordForm: {
        password: { required, minLength: minLength(6), maxLength: maxLength(22) },
        passwordConfirmation: { required, sameAs: sameAs(model => model.password) },
      },
    };
  },
  methods: {
    updateNicknameErrors () {
      const { nickname } = this.$v.profileForm;
      this.fieldErrors.nickname = nickname.$dirty ? [
        ...(nickname.required ? [] : [this.$t('errors.nickname.required')]),
      ] : [];
    },
    updatePasswordErrors () {
      const { password } = this.$v.passwordForm;
      this.fieldErrors.password = password.$dirty ? [
        ...(password.required ? [] : [this.$t('errors.password.required')]),
        ...(password.minLength && password.maxLength ? [] : [this.$t('errors.password.length',
          { min: password.$params.minLength.min, max: password.$params.maxLength.max })]),
      ] : [];
    },
    updatePasswordConfirmationErrors () {
      const { passwordConfirmation } = this.$v.passwordForm;
      this.fieldErrors.passwordConfirmation = passwordConfirmation.$dirty ? [
        ...(passwordConfirmation.required ? [] : [this.$t('errors.passwordConfirmation.required')]),
        ...(passwordConfirmation.sameAs ? [] : [this.$t('errors.passwordConfirmation.sameAs')]),
      ] : [];
    },

    async updateProfile () {
      this.$v.profileForm.$touch();
      this.updateNicknameErrors();
      if (!this.$v.profileForm.$anyError) {
        this.$nuxt.$loading.start();
        this.$v.profileForm.$reset();
        const { nickname } = this.profileForm;
        try {
          await this.$axios.$patch('/api/auth/profile', { nickname });
          this.profileForm.nickname = '';
          this.$store.commit('notifications/showInfo', { html: this.$t('notifications.profileUpdated') });
        } catch (ex) {
          this.$store.commit('notifications/showError', this.$t('errors.serverError'));
          this.$logger.error(ex);
        }
        this.$nuxt.$loading.finish();
      }
    },
    async changePassword () {
      this.$v.passwordForm.$touch();
      this.updatePasswordErrors();
      this.updatePasswordConfirmationErrors();
      if (!this.$v.passwordForm.$anyError) {
        this.$nuxt.$loading.start();
        this.$v.passwordForm.$reset();
        const { password } = this.passwordForm;
        try {
          await this.$axios.$patch('/api/auth/password', { token: this.$store.state.user.accessToken, password });
          this.passwordForm.password = this.passwordForm.passwordConfirmation = '';
          this.$store.commit('notifications/showInfo', { html: this.$t('notifications.passwordChanged') });
        } catch (ex) {
          this.$store.commit('notifications/showError', this.$t('errors.serverError'));
          this.$logger.error(ex);
        }
        this.$nuxt.$loading.finish();
      }
    },
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
  nickname: Nickname
  password: Password
  passwordConfirmation: Confirm your password
  updateProfile: Update profile
  changePassword: Change password
  notifications:
    passwordChanged: Passowrd successfully changed
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
