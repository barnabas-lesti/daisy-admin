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
.Accordion {
	@_borderColor: #dbdbdb;

	border-bottom: 1px solid @_borderColor;
	font-size: 1rem;

	&_header {
		font-weight: 600;
		font-size: 1.2em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: .5rem;
		padding-bottom: .5rem;

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
			padding-top: .5rem;
			padding-bottom: .5rem;
		}

		.Accordion_icon {
			transform: rotate(180deg)
		}
	}
}
</style>
