<template>
	<div class="Spinner"></div>
</template>

<script>
export default {
	name: 'Spinner',
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.Spinner {
	font-size: 1rem;
	display: inline-block;

	&::after {
    animation: spinAround .5s infinite linear;
    border: 2px solid @colors_light0;
    border-radius: 2rem;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    content: '';
    display: block;
    height: 1em;
    position: relative;
		width: 1em;
	}

	@keyframes spinAround {
		from {
			transform: rotate(0)
		}

		to {
			transform: rotate(359deg)
		}
	}
}
</style>
