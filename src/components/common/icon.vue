<template>
	<i
		:class="[
			'Icon',
			iconClass,
		]"
	/>
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
		type: {
			type: String,
			required: true,
		},
	},
};
</script>
