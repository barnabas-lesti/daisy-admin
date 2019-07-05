<template lang="pug">
	v-app
		layout-header(:menu-items='menuItems')

		v-content
			v-container(grid-list-xl)
				nuxt

		layout-footer(:social-items='socialItems')

		layout-notifications
</template>

<script>
import { mapState } from 'vuex';

import menuItems from '../config/menu-items';
import socialItems from '../config/social-items';

import LayoutHeader from '../components/layout-header';
import LayoutFooter from '../components/layout-footer';
import LayoutNotifications from '../components/layout-notifications';

export default {
	components: {
		LayoutHeader,
		LayoutFooter,
		LayoutNotifications,
	},
	data () {
		return {
			menuItems,
			socialItems,
		};
	},
	computed: {
		...mapState([ 'isLoading' ]),
	},
};
</script>
