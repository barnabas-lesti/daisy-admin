<template lang="pug">
  v-toolbar.layout-toolbar(app, dense)
    v-toolbar-side-icon.hidden-md-and-up(@click="$emit('open-sidebar')")
    v-toolbar-title {{ $t('brand') }}
    v-spacer
    v-toolbar-items
      v-btn.hidden-sm-and-down(v-for='item of menuItems', :key='item.labelKey', :to='{ name: item.routeName }',
        :exact='item.exact', flat, nuxt) {{ item.label || $t(item.labelKey) }}
      v-btn(v-if='!user', flat, @click="$emit('request-sign-in')") {{ $t('signIn') }}
      v-btn(v-else, flat, @click="$emit('sign-out')") {{ $t('signOut') }}
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

<i18n>
en:
  brand: Daisy
  signIn: Sign in
  signOut: Sign out
</i18n>
