<template lang="pug">
	.layout-header
		v-navigation-drawer.hidden-md-and-up(v-model='sidebar', :hide-overlay='this.$vuetify.breakpoint.mdAndUp', app, temporary)
			v-toolbar.transparent(v-if='user && user.isLoggedIn', flat)
				v-list
					v-list-tile(avatar)
						v-list-tile-avatar
							img(:src='user.imageUrl')
						v-list-tile-content
							v-list-tile-title {{ user.fullName }}
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

export default {
	name: 'LayoutHeader',
	props: {
		menuItems: {
			type: Array,
			default: () => [],
		},
	},
	computed: {
		...mapState('user', [ 'user' ]),
	},
	data () {
		return {
			sidebar: false,
		};
	},
};
</script>
