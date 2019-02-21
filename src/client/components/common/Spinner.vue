<template>
	<div
		:class="[
			'Spinner',
			{ 'Spinner-dark': dark },
			{ 'Spinner-small': small },
			{ 'Spinner-large': large },
		]"
	></div>
</template>

<script>
export default {
	name: 'Spinner',
	props: {
		small: Boolean,
		dark: Boolean,
		large: Boolean,
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.Spinner {
	font-size: 3rem;
	display: inline-block;

	&::after {
		animation: spinAround .5s infinite linear;
		border: 2px solid @colors_light0;
		border-radius: 10rem;
		border-right-color: transparent;
		border-top-color: transparent;
		content: '';
		display: block;
		height: 1em;
		position: relative;
		width: 1em;
	}

	&-dark {
		&::after {
			border-left-color: @colors_dark1;
			border-bottom-color: @colors_dark1;
		}
	}

	&-small {
		font-size: 1rem;
	}

	&-large {
		font-size: 6rem;
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
