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
.LoadingOverlay {
	@_bgColor: rgba(10, 10, 10, .2);
	@_bgColor-light: rgba(255, 255, 255, .6);

	align-items: center;
	background-color: @_bgColor;
	display: flex;
	height: 100%;
	justify-content: center;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 200;

	&-light {
		background-color: @_bgColor-light;
	}
}
</style>
