<template>
	<div class="LayoutSimple">
		<div class="LayoutSimple_content">
			<LayoutSimpleHeader :menuItems="menuItems" />
			<div class="container">
				<slot />
			</div>
		</div>
		<LayoutSimpleFooter :menuItems="menuItems" />
		<LayoutSimpleNotification />
	</div>
</template>

<script>
import menuItems from '../../common/menuItems';

import LayoutSimpleFooter from './LayoutSimpleFooter';
import LayoutSimpleHeader from './LayoutSimpleHeader';
import LayoutSimpleNotification from './LayoutSimpleNotification';

export default {
	name: 'LayoutSimple',
	components: {
		LayoutSimpleFooter,
		LayoutSimpleHeader,
		LayoutSimpleNotification,
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
