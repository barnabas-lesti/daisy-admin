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
import Header from './common/Header';
import Sidebar from './common/Sidebar';

const navItems = [
	{
		icon: 'dashboard',
		label: 'Dashboard',
		routeName: 'dashboard',
	},
	{
		icon: 'food',
		label: 'Food',
		routeName: 'food',
	},
	{
		icon: 'calculator',
		label: 'Calculator',
		routeName: 'calculator',
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
@import (reference) '../styles/variables';

.App {
	&_content {
		padding-top: @layout_headerHeight;
		padding-left: @layout_sidebarWidth;
	}
}
</style>
