<template lang="pug">
  .layout-header
    base-modal(:value='modalMode', :title="$t('modal.title')",
      @accept='signIn()', @discard='closeModal()')
      template(v-slot:content)
        v-card-text
          v-form(@submit.prevent='signIn()')
            v-text-field(v-model='modal.email', :label="$t('modal.email')", type='email')
            v-text-field(v-model='modal.password', :label="$t('modal.password')", type='password')
            v-btn.info(type='submit') {{ $t('modal.signIn') }}

    v-navigation-drawer.hidden-md-and-up(v-model='sidebar', :hide-overlay='this.$vuetify.breakpoint.mdAndUp', app, temporary)
      v-toolbar.transparent(flat)
        v-toolbar-title Daisy
        template(v-slot:extension)
          v-list
            v-list-tile(v-if='user', avatar)
              v-list-tile-avatar
                img(:src='user.imageUrl')
              v-list-tile-content
                v-list-tile-title {{ user.fullName }}
            v-list-tile.layout-header_sign-in(v-else, @click='openModal()')
              v-list-tile-content {{ $t('signIn') }}
              v-list-tile-action
                v-icon account_box
      v-divider

      v-list
        v-list-tile(v-for='item of menuItems', :key='item.labelKey', :to='{ name: item.routeName }', :exact='item.exact', nuxt)
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ $t(item.labelKey) }}

    v-toolbar(app, dense)
      v-toolbar-side-icon.hidden-md-and-up(@click='sidebar = !sidebar;')
      v-spacer
      v-toolbar-items.hidden-sm-and-down
        v-btn(v-for='item of menuItems', :key='item.labelKey', :to='{ name: item.routeName }', :exact='item.exact', flat, nuxt)
          | {{ $t(item.labelKey) }}
</template>

<script>
import { mapState } from 'vuex';

import BaseModal from '../base/base-modal';

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
  components: {
    BaseModal,
  },
  computed: {
    ...mapState('user', [ 'user' ]),

    modalMode: {
      get () { return this.$route.query['modal']; },
      set (newValue) { this.$router.push({ query: { ...this.$route.query, 'modal': newValue || undefined } }); },
    },
  },
  data () {
    return {
      sidebar: false,
      menuItems,
      modal: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    signIn () {},
    openModal () {
      this.modalMode = 'sign-in';
    },
    closeModal () {
      this.modalMode = undefined;
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
  signIn: Click here to log in
  modal:
    title: Sign in
  menuItems:
    home: Home
    calculator: Calculator
    food: Food
    recipes: Recipes
    exercises: Exercises
</i18n>
