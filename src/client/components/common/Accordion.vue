<template>
	<div :class="[
		'Accordion',
		{ 'Accordion-open': isOpen },
	]">
		<div
			class="Accordion_header"
			@click="toggle()"
		>
			{{ label }}
			<Icon
				class="Accordion_icon"
				type="chevronDown"
			/>
		</div>
		<div class="Accordion_content">
			<slot />
		</div>
	</div>
</template>

<script>
import Icon from './Icon';

export default {
	name: 'Accordion',
	components: {
		Icon,
	},
	props: {
		open: Boolean,
		label: String,
	},
	methods: {
		toggle () {
			this.isOpen = !this.isOpen;
		},
	},
	data () {
		return {
			isOpen: this.open,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.Accordion {
	@_borderColor: @colors_light1;

	border: 1px solid @_borderColor;

	&_header {
		font-weight: 500;
		font-size: 1.2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: .5rem;

		&:hover {
			cursor: pointer;
		}
	}

	&_content {
		height: 0;
		overflow: hidden;
	}

	&_icon {
		margin-right: .5rem;
	}

	&-open {
		.Accordion_content {
			height: auto;
			padding: .5rem;
		}

		.Accordion_icon {
			transform: rotate(180deg)
		}
	}
}
</style>
