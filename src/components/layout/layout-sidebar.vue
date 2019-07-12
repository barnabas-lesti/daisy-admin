<template lang="pug">
  v-navigation-drawer.layout-sidebar.hidden-md-and-up(:value='value', :hide-overlay='this.$vuetify.breakpoint.mdAndUp', app,
    temporary, @input="$emit('input', $event)")
    v-toolbar.transparent(flat)
      v-toolbar-title {{ $t('brand') }}
    v-divider

    v-list.pt-0
      v-list-group(v-if='user', no-action)
        template(v-slot:activator).layout-header_user
          v-list-tile(avatar)
            v-list-tile-avatar
              img(:src="user.photoURL || '/images/no-profile-picture.png'")
            v-list-tile-content
              v-list-tile-title {{ user.email }}
        v-list-tile(@click="$emit('sign-out')")
          v-list-tile-content {{ $t('signOut') }}
      v-list-tile(v-else, @click="$emit('request-sign-in')")
        v-list-tile-action
          v-icon account_circle
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
  signOut: Sign out
</i18n>
