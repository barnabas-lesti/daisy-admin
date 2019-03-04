<template>
	<div class="LayoutSimple">
		<div class="LayoutSimple_content">
			<LayoutSimpleHeader :menuItems="menuItems" />
			<div class="container">
				<slot />
			</div>
		</div>
		<LayoutSimpleFooter :menuItems="menuItems" />
		<LayoutSimpleNotifications />
	</div>
</template>

<script>
import menuItems from '../../common/menuItems';

import LayoutSimpleFooter from './LayoutSimpleFooter';
import LayoutSimpleHeader from './LayoutSimpleHeader';
import LayoutSimpleNotifications from './LayoutSimpleNotifications';

export default {
	name: 'LayoutSimple',
	components: {
		LayoutSimpleFooter,
		LayoutSimpleHeader,
		LayoutSimpleNotifications,
	},
	data () {
		return {
			menuItems,
		};
	},
};
</script>

<style lang="less">
.LayoutSimple {
	display: flex;
	flex-direction: column;
	height: 100%;

	&_content {
		flex: 1 0 auto;
	}
}
</style>
