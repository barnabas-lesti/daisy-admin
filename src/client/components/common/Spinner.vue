<template>
	<div
		:class="[
			'Spinner',
			{ 'Spinner-dark': dark },
			{ 'Spinner-large': large },
			{ 'Spinner-small': small },
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
.Spinner {
	@_color: #ffffff;
	@_color-dark: #263544;

	font-size: 3rem;
	display: inline-block;

	&::after {
		animation: spinAround .5s infinite linear;
		border: 2px solid @_color;
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
			border-left-color: @_color-dark;
			border-bottom-color: @_color-dark;
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
