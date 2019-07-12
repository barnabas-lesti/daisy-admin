<template lang="pug">
  v-app
    layout-toolbar(:menu-items='menuItems', :user='user', @open-sidebar='isSidebarOpen = true', @request-sign-in='isSignInModalOpen = true',
      @sign-out='signOut()')
    layout-sidebar( v-model='isSidebarOpen', :menu-items='menuItems', :user='user', @request-sign-in='isSignInModalOpen = true',
      @sign-out='signOut()')
    v-content
      v-container(grid-list-xl)
        nuxt
    layout-footer(:social-items='socialItems')
    layout-notifications(v-model='notification')
    layout-sign-in-modal
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
    };
  },
  computed: {
    ...mapState('user', [ 'user' ]),

    isSidebarOpen: {
      get () { return !!this.$route.query['sidebar']; },
      set (newValue) { this.$utils.pushRouteQuery({ 'sidebar': newValue }); },
    },
    isSignInModalOpen: {
      get () { return !!this.$route.query['sign-in']; },
      set (newValue) { this.$utils.pushRouteQuery({ 'sign-in': newValue }); },
    },

    notification: {
      get () { return this.$store.state.notifications.notification; },
      set (newValue) { this.$store.commit('notifications/clear'); },
    },
  },
  methods: {
    async signOut () {
      this.$nuxt.$loading.start();
      await this.$auth.signOut();
      this.isSidebarOpen = false;
      this.$nuxt.$loading.finish();
    },
  },
};
</script>

<i18n>
en:
  navigationItems:
    home: Home
    calculator: Calculator
    food: Food
    recipes: Recipes
    exercises: Exercises
</i18n>
