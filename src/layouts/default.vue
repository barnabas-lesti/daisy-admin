<template lang="pug">
  v-app
    layout-toolbar(:menu-items='menuItems', :user='user', @open-sidebar='isSidebarOpen = true')
    layout-sidebar(v-model='isSidebarOpen', :menu-items='menuItems', :user='user', @sign-out='signOut()')
    v-content
      v-container(grid-list-xl)
        nuxt
    layout-footer(:social-items='socialItems')
    layout-notifications(v-model='notification')
</template>

<script>
import { mapState } from 'vuex';

import LayoutToolbar from '../components/layout/layout-toolbar';
import LayoutSidebar from '../components/layout/layout-sidebar';
import LayoutFooter from '../components/layout/layout-footer';
import LayoutNotifications from '../components/layout/layout-notifications';

export default {
  components: {
    LayoutToolbar,
    LayoutSidebar,
    LayoutFooter,
    LayoutNotifications,
  },
  data () {
    return {
      isSidebarOpen: false,
      menuItems: this.$store.state.navigation.menuItems.map(item => ({ ...item, label: this.$t(item.labelKey) })),
      socialItems: this.$store.state.navigation.socialItems,
    };
  },
  computed: {
    ...mapState('user', [ 'user' ]),

    notification: {
      get () { return this.$store.state.notifications.notification; },
      set (newValue) { this.$store.commit('notifications/clear'); },
    },
  },
  methods: {
    signOut () {
      this.$auth.signOut();
      this.isSidebarOpen = false;
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
</i18n>
