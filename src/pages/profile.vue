<template lang="pug">
  v-layout.pages-profile(
    row,
    wrap,
    justify-space-around,
  )
    v-flex.text-xs-center(xs12)
      h1 {{ $t('pages.profile.title', { fullName: user.fullName }) }}

    v-flex.text-xs-center(
      xs12,
      lg3,
    )
      v-avatar.pages-profile_avatar.elevation-3.mb-3(
        size='240',
        @click='onProfileImageClick()',
      )
        v-img(:src='profileImageSrc')
      .font-italic {{ $t('pages.profile.clickToEdit') }}

    v-flex(
      xs12,
      lg9,
    )
      h3.mb-2 {{ $t('pages.profile.generalForm.title') }}
      v-form.mb-4(
        ref='generalForm',
        @submit.prevent='updateProfile()',
      )
        v-scroll-y-transition
          .red--text(v-if='generalForm.serverError') {{ $t(generalForm.serverError.messageKey) }}
        v-text-field(
          :value='user.email',
          :label='$t("pages.profile.generalForm.email")',
          name='email',
          type='email',
          disabled,
        )
        v-text-field(
          v-model='generalForm.fullName',
          :label='$t("pages.profile.generalForm.fullName")',
          :error='!!generalForm.serverError',
          :rules='rules.fullName',
          name='fullName',
          type='text',
        )
        .text-xs-right(xs12)
          v-btn.info.ma-0(type='submit') {{ $t('pages.profile.generalForm.submit') }}

      h3.mb-2 {{ $t('pages.profile.changePasswordForm.title') }}
      v-form(
        ref='changePasswordForm'
        @submit.prevent='changePassword()',
      )
        v-scroll-y-transition
          .red--text(v-if='changePasswordForm.serverError') {{ $t(changePasswordForm.serverError.messageKey) }}
        v-text-field(
          v-model='changePasswordForm.password',
          :label='$t("pages.profile.changePasswordForm.password")',
          :error='!!changePasswordForm.serverError',
          :rules='rules.password',
          name='password',
          type='password',
        )
        v-text-field(
          v-model='changePasswordForm.passwordConfirmation',
          :label='$t("pages.profile.changePasswordForm.passwordConfirmation")',
          :error='!!changePasswordForm.serverError',
          :rules='rules.passwordConfirmation',
          name='passwordConfirmation',
          type='password',
        )
        .text-xs-right(xs12)
          v-btn.info.ma-0(type='submit') {{ $t('pages.profile.changePasswordForm.submit') }}

    base-modal(
      v-model='isModalOpen',
      :title='$t("pages.profile.modal.title")',
      max-width='432',
      @accept='confirmProfileImageUpdate()',
      @discard='discardProfileImageUpdate()',
    )
      v-container(grid-list-xl)
        v-layout(
          row,
          wrap,
        )
          v-flex(xs12)
            v-img.elevation-3(:src='modal.imageSrc || "/images/no-profile-image.png"')
          v-flex(xs12)
            v-text-field(
              v-model='modal.profileImageUrl',
              :label='$t("pages.profile.modal.profileImageUrl")',
              type='text',
              @change='modal.imageSrc = modal.profileImageUrl;',
            )
          v-flex.text-xs-right(xs12)
            v-btn.ma-0.mr-3(@click='discardProfileImageUpdate()') {{ $t('pages.profile.modal.discard') }}
            v-btn.info.ma-0(@click='confirmProfileImageUpdate()') {{ $t('pages.profile.modal.confirm') }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import BaseModal from '../components/base/modal';

export default {
  name: 'PagesProfile',
  middleware: 'signed-in',
  components: {
    BaseModal,
  },
  head () {
    const { fullName } = this.user;
    return {
      title: this.$t('pages.profile.title', { fullName }),
      meta: [ { name: 'description', content: this.$t('pages.profile.description', { fullName }) } ],
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
      generalForm: {
        fullName,
        profileImageUrl,
        serverError: null,
      },
      changePasswordForm: {
        password: '',
        passwordConfirmation: '',
        serverError: null,
      },
      rules: {
        fullName: [
          v => !!v || this.$t('pages.profile.errors.fullName.required'),
          (v = '') => (v.length >= 6 && v.length <= 22) || this.$t('pages.profile.errors.fullName.between', { min: 6, max: 22 }),
        ],
        password: [
          v => !!v || this.$t('pages.profile.errors.password.required'),
          (v = '') => (v.length >= 6 && v.length <= 22) || this.$t('pages.profile.errors.password.between', { min: 6, max: 22 }),
        ],
        passwordConfirmation: [
          v => !!v || this.$t('pages.profile.errors.passwordConfirmation.required'),
          v => this.changePasswordForm.password === v || this.$t('pages.profile.errors.passwordConfirmation.sameAs'),
        ],
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
      this.generalForm.profileImageUrl = this.modal.profileImageUrl;
      this.$store.commit('auth/updateUser', { profileImageUrl: this.modal.profileImageUrl || null });
      this.isModalOpen = false;
    },
    discardProfileImageUpdate () {
      this.modal.imageSrc = this.modal.profileImageUrl = this.generalForm.profileImageUrl;
      this.isModalOpen = false;
    },
    async updateProfile () {
      this.generalForm.serverError = null;
      if (this.$refs.generalForm.validate()) {
        try {
          await this.$store.dispatch('auth/updateProfile', this.generalForm);
          this.$store.commit('notifications/showSuccess', {
            messageKey: 'pages.profile.notifications.profileUpdated',
          });
        } catch ({ type }) {
          this.generalForm.serverError = { type, messageKey: `pages.profile.errors.${type}` };
        }
      }
    },
    async changePassword () {
      this.changePasswordForm.serverError = null;
      if (this.$refs.changePasswordForm.validate()) {
        const { password } = this.changePasswordForm;
        try {
          await this.$store.dispatch('auth/resetPassword', { token: this.accessToken, password });
          this.$store.commit('notifications/showSuccess', {
            messageKey: 'pages.profile.notifications.passwordChanged',
          });
        } catch ({ type }) {
          this.changePasswordForm.serverError = { type, messageKey: `pages.profile.errors.${type}` };
        }
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
