<template lang="pug">
  v-navigation-drawer.layout-sidebar.hidden-md-and-up(:value='value', :hide-overlay='this.$vuetify.breakpoint.mdAndUp',
    app, temporary, @input='$emit("input", $event)')
    v-toolbar.transparent(flat)
      v-toolbar-title {{ $t('brand') }}
    v-divider

    v-list.pt-0
      v-list-group(v-if='user', no-action)
        template(v-slot:activator)
          v-list-tile(avatar)
            v-list-tile-avatar
              img.elevation-3(:src='getProfileImagePath')
            v-list-tile-content
              v-list-tile-title {{ $t('welcome', { nickname: user.nickname }) }}
        v-list-tile(:to="{ name: 'locale-profile' }", nuxt)
          v-list-tile-content {{ $t('profile') }}
        v-list-tile(@click="onSignOutClick()")
          v-list-tile-content {{ $t('signOut') }}
      template(v-else)
        v-list-tile.py-2
          v-btn.success(:to="{ name: 'locale-register', query: { 'referer': $route.name } }", nuxt)
            | {{ $t('register') }}
          v-btn.info(:to="{ name: 'locale-sign-in', query: { 'referer': $route.name } }", nuxt)
            | {{ $t('signIn') }}
      v-divider

      v-list-tile(v-for='item of menuItems', :key='item.labelKey', :to='{ name: item.routeName }', :exact='item.exact', nuxt)
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title {{ item.label || $t(item.labelKey) }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'LayoutSidebar',
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    menuItems: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    isOpen: false,
  }),
  computed: {
    ...mapState('user', [ 'user' ]),
    ...mapGetters('user', [ 'getProfileImagePath' ]),
  },
  methods: {
    onSignOutClick () {
      this.$emit('input', false);
      this.$auth.signOut();
    },
  },
};
</script>

<i18n>
en:
  brand: Daisy
  register: Register
  signIn: Sign in
  signOut: Sign out
  profile: Profile
  welcome: "Hi {nickname}!"
</i18n>
