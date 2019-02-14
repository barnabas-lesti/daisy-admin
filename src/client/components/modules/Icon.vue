<template>
	<i
		v-html="iconHtml(type)"
		class="Icon">
	</i>
</template>

<script>
import Feather from 'feather-icons';

const iconMap = {
	'dashboard': 'bar-chart-2',
	'edit': 'edit',
	'save': 'check-circle',
	'delete': 'trash-2',
	'food': 'shopping-cart',
	'home': 'home',
};

export default {
	data () {
		return {
			iconHtml: type => {
				const icon = Feather.icons[iconMap[type]];
				return icon ? icon.toSvg({
					height: 18,
					width: 18,
				}) : '';
			},
		};
	},
	name: 'Icon',
	props: {
		type: String,
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables.less';

.Icon {
	display: inline-block;
	font-size: 0;
}
</style>
