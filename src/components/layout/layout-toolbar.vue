<template lang="pug">
  v-toolbar.layout-toolbar(app, dense)
    v-toolbar-side-icon.hidden-md-and-up(@click="$emit('open-sidebar')")
    v-toolbar-title {{ $t('brand') }}
    v-spacer
    v-toolbar-items
      v-btn.hidden-sm-and-down(v-for='item of menuItems', :key='item.labelKey', :to='{ name: item.routeName }',
        :exact='item.exact', flat, nuxt) {{ item.label || $t(item.labelKey) }}
      v-menu(min-width='192px', offset-y)
        template(v-slot:activator='{ on }')
          v-btn(v-on='on', icon)
            v-avatar(v-if='user', size='36')
              v-img.elevation-3(:src='getProfileImagePath')
            v-icon(v-else, size='36') account_circle
        v-list(v-if='user')
          v-list-tile
            v-list-tile-content.font-weight-bold {{ $t('welcome', { nickname: user.nickname }) }}
          v-divider
          v-list-tile(:to="{ name: 'locale-profile' }", nuxt)
            v-list-tile-content {{ $t('profile') }}
          v-list-tile(@click="$emit('sign-out')")
            v-list-tile-content {{ $t('signOut') }}
        v-list(v-else)
          v-list-tile(:to="{ name: 'locale-register', query: { 'referer': $route.name } }", nuxt)
            v-list-tile-content {{ $t('register') }}
          v-list-tile(:to="{ name: 'locale-sign-in', query: { 'referer': $route.name } }", nuxt)
            v-list-tile-content {{ $t('signIn') }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'LayoutToolbar',
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState('user', [ 'user' ]),
    ...mapGetters('user', [ 'getProfileImagePath' ]),
  },
};
</script>

<style lang="stylus">
.layout-toolbar
  &_transition
    display: flex;
    height: inherit;

</style>

<i18n>
en:
  brand: Daisy
  register: Register
  signIn: Sign in
  signOut: Sign out
  profile: Profile
  welcome: "Hi {nickname}!"
</i18n>
