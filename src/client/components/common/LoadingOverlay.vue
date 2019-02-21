<template>
	<div class="LoadingOverlay">
		<Spinner />
	</div>
</template>

<script>
import Spinner from '../common/Spinner';

export default {
	name: 'LoadingOverlay',
	components: {
		Spinner,
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.LoadingOverlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: @colors_overlay1;
	z-index: 200;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
