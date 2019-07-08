<template lang="pug">
  v-snackbar.layout-notifications(v-if='notification', v-model='notification', :color='notification.type',
    :timeout='timeout', :bottom='$vuetify.breakpoint.smAndUp', :right='$vuetify.breakpoint.smAndUp')
    span {{ notification.text }}
</template>

<script>
export default {
  name: 'LayoutNotifications',
  computed: {
    notification: {
      get () { return this.$store.state.notifications.notification; },
      set () { this.$store.commit('notifications/clear'); },
    },
  },
  data () {
    return {
      timeout: 3000,
    };
  },
};
</script>
