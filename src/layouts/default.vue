<template lang="pug">
  v-app.layout-default
    layout-toolbar
    layout-sidebar
    v-content
      v-container.layout-default_container(grid-list-xl)
        nuxt
    layout-footer
    layout-notifications
</template>

<script>
import LayoutToolbar from '../components/layout/toolbar';
import LayoutSidebar from '../components/layout/sidebar';
import LayoutFooter from '../components/layout/footer';
import LayoutNotifications from '../components/layout/notifications';

export default {
  components: {
    LayoutToolbar,
    LayoutSidebar,
    LayoutFooter,
    LayoutNotifications,
  },
  head () {
    return this.$nuxtI18nSeo();
  },
};
</script>

<style lang="stylus">
.layout-default
  &_container
    @media only screen and (min-width: 1264px)
      max-width 1185p
</style>
