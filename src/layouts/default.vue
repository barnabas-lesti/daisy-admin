<template lang="pug">
  v-app
    layout-header
    v-content
      v-container(grid-list-xl)
        nuxt
    layout-footer
    layout-notifications
    layout-sign-in-modal
</template>

<script>
import { mapState } from 'vuex';

import LayoutHeader from '../components/layout/layout-header';
import LayoutFooter from '../components/layout/layout-footer';
import LayoutNotifications from '../components/layout/layout-notifications';
import LayoutSignInModal from '../components/layout/layout-sign-in-modal';

export default {
  components: {
    LayoutHeader,
    LayoutFooter,
    LayoutNotifications,
    LayoutSignInModal,
  },
  computed: {
    ...mapState([ 'isLoading' ]),
  },
  methods: {
    listenToUserState () {
      this.$firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit('notifications/showInfo', this.$t('notifications.signedInAs', { email: user.email }));
        } else {
          this.$store.commit('notifications/showInfo', this.$t('notifications.signedOut'));
        }
        // this.$router.push({ query: { ...this.$route.query, 'sidebar': undefined } });
        this.$store.commit('user/setUser', user);
      });
    },
  },
  mounted () {
    this.listenToUserState();
  },
};
</script>

<i18n>
en:
  notifications:
    signedInAs: "Signed in as <strong>{email}</strong>"
    signedOut: Signed out
</i18n>
