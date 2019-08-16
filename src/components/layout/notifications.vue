<template lang="pug">
  v-snackbar.layout-notifications(
    v-if='notification',
    v-model='notification',
    :color='notification.type',
    :timeout='timeout',
    :bottom='$vuetify.breakpoint.smAndUp',
    :right='$vuetify.breakpoint.smAndUp',
    auto-height,
  )
    span(
      v-if='notification.html',
      v-html='notification.html'
    )
    span(v-else) {{ notification.text }}
</template>

<script>
export default {
  name: 'LayoutNotifications',
  data () { return { timeout: 3000 }; },
  computed: {
    notification: {
      get () { return this.$store.state.notifications.notification; },
      set (newValue) { this.$store.commit('notifications/clear'); },
    },
  },
};
</script>
