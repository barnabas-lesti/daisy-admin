<template>
	<div class="App">
		<Header />
		<Sidebar :navItems="navItems" />
		<div class="App_content">
			<router-view/>
		</div>
	</div>
</template>

<script>
import Header from './modules/Header.vue';
import Sidebar from './modules/Sidebar.vue';

const navItems = [
	{
		icon: 'dashboard',
		label: 'Dashboard',
		routeName: 'dashboard',
	},
	{
		icon: 'food',
		label: 'Foods',
		routeName: 'foods',
	},
];

export default {
	components: {
		Header,
		Sidebar,
	},
	data: () => {
		return {
			navItems,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../styles/variables.less';

.App {
	&_content {
		padding-top: @layout_headerHeight;
		padding-left: @layout_sidebarWidth;
	}
}
</style>
