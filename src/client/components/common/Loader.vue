<template>
	<div class="Loader">
		<Spinner :dark="dark" :large="large" :small="small" />
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
		small: Boolean,
		large: Boolean,
	},
};
</script>

<style lang="less">
.Loader {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
