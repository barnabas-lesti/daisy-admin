<template>
	<i
		:class="[
			'Icon',
			iconClass,
		]"
	></i>
</template>

<script>
const iconMap = {
	'dashboard': 'fas fa-chart-line',
	'food': 'fas fa-utensils',
	'circle': 'far fa-circle',
	'recipes': 'fas fa-book-open',
};

export default {
	data () {
		return {
			iconClass: iconMap[this.type],
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
