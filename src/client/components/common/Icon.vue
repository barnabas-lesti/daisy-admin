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
