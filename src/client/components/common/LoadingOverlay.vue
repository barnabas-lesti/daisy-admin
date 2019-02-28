<template>
	<div :class="[
		'LoadingOverlay',
		{ 'LoadingOverlay-light': light },
	]">
		<Spinner :dark="light"/>
	</div>
</template>

<script>
import Spinner from '../common/Spinner';

export default {
	name: 'LoadingOverlay',
	components: {
		Spinner,
	},
	props: {
		light: Boolean,
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.LoadingOverlay {
	align-items: center;
	background-color: @colors_overlay1;
	display: flex;
	height: 100%;
	justify-content: center;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 200;

	&-light {
		background-color: @colors_overlay2;
	}
}
</style>
