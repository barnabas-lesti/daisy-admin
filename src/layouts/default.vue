<template lang="pug">
  v-app
    layout-header
    v-content
      v-container(grid-list-xl)
        nuxt
    layout-footer
    layout-notifications
</template>

<script>
import { mapState } from 'vuex';

import LayoutHeader from '../components/layout/layout-header';
import LayoutFooter from '../components/layout/layout-footer';
import LayoutNotifications from '../components/layout/layout-notifications';

export default {
  components: {
    LayoutHeader,
    LayoutFooter,
    LayoutNotifications,
  },
  computed: {
    ...mapState([ 'isLoading' ]),
  },
};
</script>
