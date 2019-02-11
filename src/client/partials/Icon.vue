<template>
	<i
		v-html="iconHtml(type)"
		class="Icon">
	</i>
</template>

<script>
import Feather from 'feather-icons';

const iconMapping = {
	'dashboard': 'bar-chart-2',
	'home': 'home',
};

export default {
	data () {
		return {
			iconHtml: type => {
				const icon = Feather.icons[iconMapping[type]];
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

<style scoped lang="less">
@import (reference) '../styles/variables.less';

.Icon {
	display: inline-block;
	font-size: 0;
}
</style>
