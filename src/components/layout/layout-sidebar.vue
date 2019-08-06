<template lang="pug">
  v-navigation-drawer.layout-sidebar.hidden-md-and-up(:value='value', :hide-overlay='this.$vuetify.breakpoint.mdAndUp', app,
    temporary, @input="$emit('input', $event)")
    v-toolbar.transparent(flat)
      v-toolbar-title {{ $t('brand') }}
    v-divider

    v-list.pt-0
      v-list-group(v-if='user', no-action)
        template(v-slot:activator)
          v-list-tile(avatar)
            v-list-tile-avatar
              img.elevation-3(:src="user.avatar ? `/images/avatars/${user.avatar}` : '/images/no-profile-picture.png'")
            v-list-tile-content
              v-list-tile-title {{ user.nickname || user.email }}
        v-list-tile(:to="{ name: 'locale-profile' }", nuxt)
          v-list-tile-content {{ $t('profile') }}
        v-list-tile(@click="$emit('sign-out')")
          v-list-tile-content {{ $t('signOut') }}
      template(v-else)
        v-list-tile(:to="{ name: 'locale-register', query: { 'referer': $route.name } }", nuxt)
          v-list-tile-action
            v-icon account_circle
          v-list-tile-content
            v-list-tile-title {{ $t('register') }}
        v-list-tile(:to="{ name: 'locale-sign-in', query: { 'referer': $route.name } }", nuxt)
          v-list-tile-action
            v-icon exit_to_app
          v-list-tile-content
            v-list-tile-title {{ $t('signIn') }}
      v-divider

      v-list-tile(v-for='item of menuItems', :key='item.labelKey', :to='{ name: item.routeName }', :exact='item.exact', nuxt)
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title {{ item.label || $t(item.labelKey) }}
</template>

<script>
export default {
  name: 'LayoutSidebar',
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    user: {
      required: true,
      validator: prop => typeof prop === 'object' || prop === null,
    },
    menuItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="stylus">
.layout-sidebar
  &_sign-out-icon
    transform rotate(180deg)

.v-list__group__header--active
  background: initial !important;

.v-list__group--active
  &::before, &::after
    background: initial !important;

</style>

<i18n>
en:
  brand: Daisy
  signIn: Sign in
  profile: Profile
  register: Register
  signOut: Sign out
</i18n>
