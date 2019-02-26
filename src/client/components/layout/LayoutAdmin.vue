<template>
	<div class="LayoutAdmin">
		<LayoutAdminHeader />
		<LayoutAdminSidebar :navItems="menuItems" />
		<div class="LayoutAdmin_content">
			<slot />
		</div>
	</div>
</template>

<script>
import menuItems from '../../common/menuItems';

import LayoutAdminHeader from './LayoutAdminHeader';
import LayoutAdminSidebar from './LayoutAdminSidebar';

export default {
	name: 'LayoutAdmin',
	components: {
		LayoutAdminHeader,
		LayoutAdminSidebar,
	},
	data () {
		return {
			menuItems,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.LayoutAdmin {
	&_content {
		padding-top: @layout_headerHeight;
		padding-left: @layout_sidebarWidth;
	}
}
</style>
