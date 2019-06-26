<template>
	<i :class="[ 'Icon', iconClass ]" />
</template>

<script>
import icons from '../../common/icons';

export default {
	name: 'BaseIcon',
	data () { return { iconClass: icons[this.type] }; },
	props: {
		type: {
			type: String,
			required: true,
		},
	},
};
</script>
