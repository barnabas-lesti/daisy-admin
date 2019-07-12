<template lang="pug">
  .layout-header
    v-navigation-drawer.hidden-md-and-up(v-model='sidebar', :hide-overlay='this.$vuetify.breakpoint.mdAndUp', app, temporary)
      v-toolbar.transparent(flat)
        v-toolbar-title {{ $t('brand') }}
      v-divider

      template(v-if='user')
        v-list
          v-list-tile(avatar)
            v-list-tile-avatar
              img(:src="user.photoURL || '/images/no-profile-picture.png'")
            v-list-tile-content
              v-list-tile-title {{ user.email }}
        v-divider

      v-list
        v-list-tile(v-for='item of menuItems', :key='item.labelKey', :to='{ name: item.routeName }', :exact='item.exact', nuxt)
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ $t(item.labelKey) }}

        v-divider
        v-list
          v-list-tile(v-if='!user', @click='openSignInModal()')
            v-list-tile-action
              v-icon account_circle
            v-list-tile-content
              v-list-tile-title {{ $t('signIn') }}
          v-list-tile(v-else, @click='signOut()')
            v-list-tile-action
              v-icon account_circle
            v-list-tile-content
              v-list-tile-title {{ $t('signOut') }}

    v-toolbar(app, dense)
      v-toolbar-side-icon.hidden-md-and-up(@click='sidebar = !sidebar;')
      v-toolbar-title {{ $t('brand') }}
      v-spacer
      v-toolbar-items
        v-btn.hidden-sm-and-down(v-for='item of menuItems', :key='item.labelKey', :to='{ name: item.routeName }', :exact='item.exact', flat, nuxt)
          | {{ $t(item.labelKey) }}
        v-btn(v-if='!user', flat, @click='openSignInModal()') {{ $t('signIn') }}
</template>

<script>
import { mapState } from 'vuex';

const menuItems = [
  {
    routeName: 'locale',
    labelKey: 'menuItems.home',
    icon: 'home',
    exact: true,
  },
  {
    routeName: 'locale-calculator',
    labelKey: 'menuItems.calculator',
    icon: 'grid_on',
  },
  {
    routeName: 'locale-recipes',
    labelKey: 'menuItems.recipes',
    icon: 'book',
  },
  {
    routeName: 'locale-food',
    labelKey: 'menuItems.food',
    icon: 'fastfood',
  },
  {
    routeName: 'locale-exercises',
    labelKey: 'menuItems.exercises',
    icon: 'directions_run',
  },
];

export default {
  name: 'LayoutHeader',
  computed: {
    ...mapState('user', [ 'user' ]),
  },
  data () {
    return {
      sidebar: false,
      menuItems,
    };
  },
  methods: {
    async signOut () {
      await this.$firebase.auth().signOut();
      // this.$router.push({ query: { ...this.$route.query, 'sign-in': newValue || undefined } });
    },
    openSignInModal () {
      this.$router.push({ query: { ...this.$route.query, 'sign-in': true } });
    },
    closeSignInModal () {
      this.$router.push({ query: { ...this.$route.query, 'sign-in': false } });
    },
  },
};
</script>

<style lang="stylus">
.layout-header
  &_sign-in
    cursor: pointer;

</style>

<i18n>
en:
  brand: Daisy
  signIn: Sign in
  signOut: Sign out
  menuItems:
    home: Home
    calculator: Calculator
    food: Food
    recipes: Recipes
    exercises: Exercises
</i18n>
