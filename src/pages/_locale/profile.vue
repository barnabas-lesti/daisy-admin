<template lang="pug">
  v-layout.pages-profile(row, wrap, justify-space-around)
    v-flex.mt-4.text-xs-center(xs12)
      h1 {{ $t('title') }}

    v-flex(xs12)
      v-form(@submit.prevent='updateProfile()')
        v-text-field(v-model='$v.forms.profile.nickname.$model', :label="$t('forms.profile.nickname')",
          :error-messages='errors.profile.nickname', type='text' @change='updateErrors("nickname")')
        v-text-field(v-model='$v.forms.profile.profileImageUrl.$model', :label="$t('forms.profile.profileImageUrl')",
          type='text')
        .text-xs-right(xs12)
          v-btn.info.ma-0(type='submit') {{ $t('forms.profile.submit') }}

    v-flex(xs12)
      v-form(@submit.prevent='changePassword()')
        v-text-field(v-model='$v.forms.password.password.$model', :label="$t('forms.password.password')",
          :error-messages='errors.password.password',
          type='password', @change='updateErrors("password")')
        v-text-field(v-model='$v.forms.password.passwordConfirmation.$model', :label="$t('forms.password.passwordConfirmation')",
          :error-messages='errors.password.passwordConfirmation',
          type='password' @change='updateErrors("passwordConfirmation")')
        .text-xs-right(xs12)
          v-btn.info.ma-0(type='submit') {{ $t('forms.password.submit') }}
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
    const { nickname, profileImageUrl } = this.$store.state.user.user;
    return {
      forms: {
        profile: { nickname, profileImageUrl },
        password: { password: '', passwordConfirmation: '' },
      },
      errors: {
        profile: { nickname: [] },
        password: { password: [], passwordConfirmation: [] },
      },
    };
  },
  validations () {
    return {
      forms: {
        profile: { nickname: { required }, profileImageUrl: {} },
        password: {
          password: { required, minLength: minLength(6), maxLength: maxLength(22) },
          passwordConfirmation: { required, sameAs: sameAs(model => model.password) },
        },
      },
    };
  },
  methods: {
    updateErrors (args = [ 'nickname', 'password', 'passwordConfirmation' ]) {
      const fields = Array.isArray(args) ? args : [ args ];
      if (fields.includes('nickname')) {
        const { nickname } = this.$v.forms.profile;
        this.errors.profile.nickname = nickname.$dirty ? [
          ...(nickname.required ? [] : [this.$t('errors.profile.nickname.required')]),
        ] : [];
      }
      if (fields.includes('password')) {
        const { password } = this.$v.forms.password;
        this.errors.password.password = password.$dirty ? [
          ...(password.required ? [] : [this.$t('errors.password.password.required')]),
          ...(password.minLength && password.maxLength ? [] : [this.$t('errors.password.password.length',
            { min: password.$params.minLength.min, max: password.$params.maxLength.max })]),
        ] : [];
      }
      if (fields.includes('passwordConfirmation')) {
        const { passwordConfirmation } = this.$v.forms.password;
        this.errors.password.passwordConfirmation = passwordConfirmation.$dirty ? [
          ...(passwordConfirmation.required ? [] : [this.$t('errors.password.passwordConfirmation.required')]),
          ...(passwordConfirmation.sameAs ? [] : [this.$t('errors.password.passwordConfirmation.sameAs')]),
        ] : [];
      }
    },
    async updateProfile () {
      this.$v.forms.profile.$touch();
      this.updateErrors('nickname');
      if (!this.$v.forms.profile.$anyError) {
        this.$nuxt.$loading.start();
        this.$v.forms.profile.$reset();
        try {
          await this.$axios.$patch('/api/auth/profile', this.forms.profile);
          this.$store.commit('user/updateUser', this.forms.profile);
          this.$store.commit('notifications/showInfo', { html: this.$t('notifications.profile.updated') });
        } catch (ex) {
          this.$store.commit('notifications/showError', this.$t('errors.serverError'));
          this.$logger.error(ex);
        }
        this.$nuxt.$loading.finish();
      }
    },
    async changePassword () {
      this.$v.forms.password.$touch();
      this.updateErrors([ 'password', 'passwordConfirmation' ]);
      if (!this.$v.forms.password.$anyError) {
        this.$nuxt.$loading.start();
        this.$v.forms.password.$reset();
        const { password } = this.forms.password;
        try {
          await this.$axios.$patch('/api/auth/password', { token: this.$store.state.user.accessToken, password });
          this.forms.password.password = this.forms.password.passwordConfirmation = '';
          this.$store.commit('notifications/showInfo', { html: this.$t('notifications.password.updated') });
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

<i18n>
en:
  title: Profile
  description: Here you can update your profile information and change your password
  forms:
    profile:
      nickname: Nickname
      profileImageUrl: Profile Image URL
      submit: Update profile
    password:
      password: Password
      passwordConfirmation: Confirm your password
      submit: Change password
  notifications:
    profile:
      updated: Profile successfully updated
    password:
      updated: Password successfully updated
  errors:
    serverError: Sorry, an unexpected error occurred
    profile:
      nickname:
        required: Nickname is required
    password:
      password:
        required: Password is required
        length: Password must be between {min} and {max} characters
      passwordConfirmation:
        required: Password confirmation is required
        sameAs: Passwords must match
</i18n>
