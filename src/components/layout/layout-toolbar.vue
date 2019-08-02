<template lang="pug">
  v-toolbar.layout-toolbar(app, dense)
    v-toolbar-side-icon.hidden-md-and-up(@click="$emit('open-sidebar')")
    v-toolbar-title {{ $t('brand') }}
    v-spacer
    v-toolbar-items
      v-scroll-y-transition.layout-toolbar_transition(group, hide-on-leave)
        v-btn.hidden-sm-and-down(v-for='item of menuItems', :key='item.labelKey', :to='{ name: item.routeName }',
          :exact='item.exact', flat, nuxt) {{ item.label || $t(item.labelKey) }}
        v-btn(v-if='!user', :to="{ name: 'locale-register', query: { 'referer': $route.name } }", key='register', flat, nuxt) {{ $t('register') }}
</template>

<script>
export default {
  name: 'LayoutToolbar',
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
    user: {
      required: true,
      validator: prop => typeof prop === 'object' || prop === null,
    },
    sidebarOpen: {
      type: Boolean,
      default: () => false,
    },
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
  signOut: Sign out
</i18n>
