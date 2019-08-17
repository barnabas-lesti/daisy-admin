<template lang="pug">
  v-navigation-drawer.layout-sidebar.hidden-md-and-up(
    v-model='isSidebarOpen',
    :hide-overlay='this.$vuetify.breakpoint.mdAndUp',
    app,
    temporary,
  )
    v-toolbar.transparent(flat)
      v-toolbar-title {{ $t('common.brand') }}
    v-divider

    v-list.pt-0
      v-list-tile(
        v-if='user',
        avatar,
      )
        v-list-tile-avatar
          img.elevation-3(:src='profileImageSrc')
        v-list-tile-content
          v-list-tile-title {{ user.nickname }}
          v-list-tile-sub-title {{ user.email }}
      v-list-tile(
        v-else,
        :to="localePath({ name: 'sign-in', query: { 'ref': $route.name } })",
        nuxt,
      )
        v-list-tile-action
          v-icon exit_to_app
        v-list-tile-content {{ $t('components.layout.sidebar.signIn') }}
      v-divider

      v-list-tile(
        v-for='item of sidebarItems',
        :key='item.labelKey',
        :to='localePath({ name: item.routeName })',
        :exact='item.exact',
        nuxt,
      )
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title {{ item.label || $t(item.labelKey) }}

      template(v-if='user')
        v-divider
        v-list-tile(
          :to="localePath('profile')",
          nuxt,
        )
          v-list-tile-action
            v-icon account_circle
          v-list-tile-content {{ $t('components.layout.sidebar.profile') }}
        v-list-tile(
          :to="localePath({ name: 'sign-out', query: { 'ref': $route.name } })",
          nuxt,
        )
          v-list-tile-action
            v-icon.layout-sidebar_sign-out-icon exit_to_app
          v-list-tile-content {{ $t('components.layout.sidebar.signOut') }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'LayoutSidebar',
  computed: {
    ...mapState('navigation', [ 'sidebarItems' ]),
    ...mapState('auth', [ 'user' ]),
    ...mapGetters('auth', [ 'profileImageSrc' ]),

    isSidebarOpen: {
      get () { return this.$store.state.isSidebarOpen; },
      set (newValue) { newValue ? this.$store.commit('openSidebar') : this.$store.commit('closeSidebar'); },
    },
  },
};
</script>

<style lang="stylus">
.layout-sidebar
  &_sign-out-icon
    transform rotate(180deg)
</style>
