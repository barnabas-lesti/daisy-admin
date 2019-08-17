<template lang="pug">
  v-layout.pages-profile(row, wrap, justify-space-around)
    v-flex.text-xs-center(xs12)
      h1 {{ $t('title', { fullName: user.fullName }) }}

    v-flex.text-xs-center.text-lg-left(xs12, lg3)
      v-avatar.pages-profile_avatar.elevation-3.mb-3(size='240', @click='onProfileImageClick()')
        v-img(:src='profileImageSrc')
      .font-italic {{ $t('clickToEdit') }}

    v-flex(xs12, lg9)
      h3.mb-2 {{ $t('general') }}
      v-form(@submit.prevent='updateProfile()')
        v-text-field(:value='user.email', :label='$t("forms.profile.email")',
          type='email', disabled)
        v-text-field(v-model='$v.forms.profile.fullName.$model', :label='$t("forms.profile.fullName")',
          :error-messages='errors.profile.fullName', type='text', @change='updateErrors("fullName")')
        .text-xs-right(xs12)
          v-btn.info.ma-0(type='submit') {{ $t('forms.profile.submit') }}

      h3.mb-2 {{ $t('changePassword') }}
      v-form(@submit.prevent='changePassword()')
        v-text-field(v-model='$v.forms.password.password.$model', :label='$t("forms.password.password")',
          :error-messages='errors.password.password',
          type='password', @change='updateErrors("password")')
        v-text-field(v-model='$v.forms.password.passwordConfirmation.$model', :label='$t("forms.password.passwordConfirmation")',
          :error-messages='errors.password.passwordConfirmation',
          type='password' @change='updateErrors("passwordConfirmation")')
        .text-xs-right(xs12)
          v-btn.info.ma-0(type='submit') {{ $t('forms.password.submit') }}

    base-modal(v-model='isModalOpen', :title='$t("modal.title")', max-width='432', @accept='confirmProfileImageUpdate()',
      @discard='discardProfileImageUpdate()')
      v-container(grid-list-xl)
        v-layout(row, wrap)
          v-flex(xs12)
            v-img.elevation-3(:src='modal.imageSrc || "/images/no-profile-image.png"')
          v-flex(xs12)
            v-text-field(v-model='modal.profileImageUrl', :label='$t("modal.profileImageUrl")',
              type='text', @change='modal.imageSrc = modal.profileImageUrl;')
          v-flex.text-xs-right(xs12)
            v-btn.ma-0.mr-3(@click='discardProfileImageUpdate()') {{ $t('modal.discard') }}
            v-btn.info.ma-0(@click='confirmProfileImageUpdate()') {{ $t('modal.confirm') }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';

import BaseModal from '../components/base/base-modal';

export default {
  name: 'PagesProfile',
  mixins: [ validationMixin ],
  middleware: 'local/signed-in',
  components: {
    BaseModal,
  },
  head () {
    const { fullName } = this.user;
    return {
      title: this.$t('title', { fullName }),
      meta: [ { name: 'description', content: this.$t('description', { fullName }) } ],
    };
  },
  data () {
    const { fullName, profileImageUrl } = this.$store.state.auth.user;
    return {
      isModalOpen: false,
      modal: {
        imageSrc: profileImageUrl,
        profileImageUrl,
      },
      forms: {
        profile: { fullName, profileImageUrl },
        password: { password: '', passwordConfirmation: '' },
      },
      errors: {
        profile: { fullName: [] },
        password: { password: [], passwordConfirmation: [] },
      },
    };
  },
  validations () {
    return {
      forms: {
        profile: { fullName: { required }, profileImageUrl: {} },
        password: {
          password: { required, minLength: minLength(6), maxLength: maxLength(22) },
          passwordConfirmation: { required, sameAs: sameAs(model => model.password) },
        },
      },
    };
  },
  computed: {
    ...mapState('auth', [ 'user', 'accessToken' ]),
    ...mapGetters('auth', [ 'profileImageSrc' ]),
  },
  methods: {
    onProfileImageClick () {
      this.isModalOpen = true;
    },
    confirmProfileImageUpdate () {
      this.forms.profile.profileImageUrl = this.modal.profileImageUrl;
      this.$store.commit('auth/updateUser', { profileImageUrl: this.modal.profileImageUrl || null });
      this.isModalOpen = false;
    },
    discardProfileImageUpdate () {
      this.modal.imageSrc = this.modal.profileImageUrl = this.forms.profile.profileImageUrl;
      this.isModalOpen = false;
    },
    updateErrors (args = [ 'fullName', 'password', 'passwordConfirmation' ]) {
      const fields = Array.isArray(args) ? args : [ args ];
      if (fields.includes('fullName')) {
        const { fullName } = this.$v.forms.profile;
        this.errors.profile.fullName = fullName.$dirty ? [
          ...(fullName.required ? [] : [this.$t('errors.profile.fullName.required')]),
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
      this.updateErrors('fullName');
      if (!this.$v.forms.profile.$anyError) {
        this.$nuxt.$loading.start();
        this.$v.forms.profile.$reset();
        try {
          await this.$axios.$patch('/api/auth/profile', this.forms.profile);
          this.$store.commit('auth/updateUser', this.forms.profile);
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
          await this.$axios.$patch('/api/auth/password', { token: this.accessToken, password });
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

<style lang="stylus">
.pages-profile
  &_avatar
    cursor pointer

</style>
