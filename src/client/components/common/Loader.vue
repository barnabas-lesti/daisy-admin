<template>
	<div class="Loader">
		<Spinner
			:dark="dark"
			:large="large"
			:small="small"
		/>
	</div>
</template>

<script>
import Spinner from './Spinner';

export default {
	name: 'Loader',
	components: {
		Spinner,
	},
	props: {
		dark: Boolean,
		large: Boolean,
		small: Boolean,
	},
};
</script>

<style lang="less">
.Loader {
	align-items: center;
	display: flex;
	justify-content: center;
}
</style>
