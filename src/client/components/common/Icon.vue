<template>
	<i
		:class="[
			'Icon',
			iconClass,
		]"
	></i>
</template>

<script>
import icons from '../../common/icons';

export default {
	data () {
		return {
			iconClass: icons[this.type],
		};
	},
	name: 'Icon',
	props: {
		type: String,
	},
};
</script>

<style lang="less">
@import (css) url('https://use.fontawesome.com/releases/v5.7.2/css/all.css');

@import (reference) '../../styles/variables';

.Icon {
	display: inline-block;
}
</style>
