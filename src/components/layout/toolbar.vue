<template lang="pug">
  v-toolbar.layout-toolbar(
    app,
    dense,
  )
    v-toolbar-side-icon.hidden-md-and-up(@click='openSidebar()')
    v-toolbar-title {{ $t('common.brand') }}
    v-spacer
    v-toolbar-items
      v-btn.hidden-sm-and-down(
        v-for='item of menuItems',
        :key='item.labelKey',
        :to='localePath({ name: item.routeName })',
        :exact='item.exact',
        flat,
        nuxt,
      ) {{ item.label || $t(item.labelKey) }}
      v-menu(
        min-width='192',
        offset-y,
      )
        template(v-slot:activator='{ on }')
          v-btn(
            v-on='on',
            icon,
          )
            v-avatar(
              v-if='user',
              size='36',
            )
              v-img.elevation-3(:src='profileImageSrc')
            v-icon.grey--text(
              v-else,
              size='36',
            ) account_circle
        v-list(v-if='user')
          v-list-tile(avatar)
            v-list-tile-avatar
              img.elevation-3(:src='profileImageSrc')
            v-list-tile-content
              v-list-tile-title {{ user.nickname }}
              v-list-tile-sub-title {{ user.email }}
          v-divider
          v-list-tile(
            :to='localePath("profile")',
            nuxt,
          )
            v-list-tile-action
              v-icon account_circle
            v-list-tile-content {{ $t('components.layout.toolbar.profile') }}
          v-list-tile(
            :to='localePath({ name: "sign-out", query: { "ref": $route.name } })',
            nuxt,
          )
            v-list-tile-action
              v-icon.layout-toolbar_sign-out-icon exit_to_app
            v-list-tile-content {{ $t('components.layout.toolbar.signOut') }}
        v-list(v-else)
          v-list-tile(
            :to='localePath({ name: "register", query: { "ref": $route.name } })',
            nuxt,
          )
            v-list-tile-action
              v-icon account_circle
            v-list-tile-content {{ $t('components.layout.toolbar.register') }}
          v-list-tile(
            :to='localePath({ name: "sign-in", query: { "ref": $route.name } })',
            nuxt,
          )
            v-list-tile-action
              v-icon exit_to_app
            v-list-tile-content {{ $t('components.layout.toolbar.signIn') }}
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'LayoutToolbar',
  computed: {
    ...mapState('auth', [ 'user' ]),
    ...mapState('navigation', [ 'menuItems' ]),
    ...mapGetters('auth', [ 'profileImageSrc' ]),
  },
  methods: {
    ...mapMutations([ 'openSidebar' ]),
  },
};
</script>

<style lang="stylus">
.layout-toolbar
  &_sign-out-icon
    transform rotate(180deg)
</style>
