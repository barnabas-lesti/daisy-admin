<template>
	<div class="App">
		<Header />
		<Sidebar :navItems="menuItems" />
		<div class="App_content">
			<router-view/>
		</div>
	</div>
</template>

<script>
import menuItems from '../common/menuItems';

import Header from './common/Header';
import Sidebar from './common/Sidebar';

export default {
	components: {
		Header,
		Sidebar,
	},
	data: () => {
		return {
			menuItems,
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
