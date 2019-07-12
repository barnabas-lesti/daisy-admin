<template lang="pug">
  v-app
    layout-toolbar(:menu-items='menuItems', :user='user', @open-sidebar='isSidebarOpen = true', @request-sign-in='isSignInModalActive = true',
      @sign-out='signOut()')
    layout-sidebar(v-model='isSidebarOpen', :menu-items='menuItems', :user='user', @request-sign-in='isSignInModalActive = true',
      @sign-out='signOut()')
    v-content
      v-container(grid-list-xl)
        nuxt
    layout-footer(:social-items='socialItems')
    layout-notifications(v-model='notification')
    layout-sign-in-modal(v-model='isSignInModalActive', :errors='signInErrors', ref='signInModalRef', @cancel='isSignInModalActive = false', @submit='signIn($event)')
</template>

<script>
import { mapState } from 'vuex';

import LayoutToolbar from '../components/layout/layout-toolbar';
import LayoutSidebar from '../components/layout/layout-sidebar';
import LayoutFooter from '../components/layout/layout-footer';
import LayoutNotifications from '../components/layout/layout-notifications';
import LayoutSignInModal from '../components/layout/layout-sign-in-modal';

export default {
  components: {
    LayoutToolbar,
    LayoutSidebar,
    LayoutFooter,
    LayoutNotifications,
    LayoutSignInModal,
  },
  data () {
    return {
      menuItems: this.$store.state.navigation.menuItems.map(item => ({ ...item, label: this.$t(item.labelKey) })),
      socialItems: this.$store.state.navigation.socialItems,

      signInErrors: [],
    };
  },
  computed: {
    ...mapState('user', [ 'user' ]),

    isSidebarOpen: {
      get () { return !!this.$route.query['sidebar']; },
      set (newValue) { this.$utils.pushRouteQuery({ 'sidebar': newValue }); },
    },
    isSignInModalActive: {
      get () { return !!this.$route.query['sign-in']; },
      set (newValue) { this.$utils.pushRouteQuery({ 'sign-in': newValue }); },
    },

    notification: {
      get () { return this.$store.state.notifications.notification; },
      set (newValue) { this.$store.commit('notifications/clear'); },
    },
  },
  methods: {
    async signIn ({ email, password }) {
      this.$nuxt.$loading.start();
      try {
        await this.$firebase.auth().signInWithEmailAndPassword(email, password);
        this.isSignInModalActive = false;
        this.$refs.signInModalRef.reset();
        this.$store.commit('notifications/showInfo', { html: this.$t('notifications.signInSuccessful', { email }) });
      } catch (ex) {
        if (ex.code === 'auth/wrong-password' || ex.code === 'auth/user-not-found') {
          this.signInErrors = [this.$t('notifications.authenticationFailed')];
          console.log(this.signInErrors);
        } else {
          this.$store.commit('notifications/showError', this.$t('notifications.serverError'));
          this.$sentry ? this.$sentry.captureException(ex) : console.error(ex);
        }
      }
      this.$nuxt.$loading.finish();
      this.signInErrors = [];
    },

    async signOut () {
      this.$nuxt.$loading.start();
      await this.$firebase.auth().signOut();
      this.isSidebarOpen = false;
      this.$nuxt.$loading.finish();
    },
  },
};
</script>

<i18n>
en:
  menuItems:
    home: Home
    calculator: Calculator
    food: Food
    recipes: Recipes
    exercises: Exercises
  notifications:
    authenticationFailed: Sign in failed, invalid credentials
    serverError: Sorry, an unexpected error occurred
    signInSuccessful: "Signed in as <strong>{email}</strong>"
</i18n>
