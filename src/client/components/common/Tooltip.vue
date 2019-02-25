<template>
	<div
		:class="[
			'Tooltip',
			{ 'Tooltip-visible': isVisible },
			{ 'Tooltip-overflowHidden': isOverflowHidden },
		]"
		@click="toggleTooltip()"
	>
		<Icon
			class="Tooltip_icon"
			type="info"
		/>
		<div class="Tooltip_content">
			<slot />
		</div>
	</div>
</template>

<script>
import Icon from './Icon';

const FADE_ANIMATION_DURATION = 200;

export default {
	name: 'Tooltip',
	components: {
		Icon,
	},
	props: {
		open: Boolean,
	},
	methods: {
		toggleTooltip () {
			this.isVisible = !this.isVisible;
			if (this.isVisible) {
				this.isOverflowHidden = false;
			}
			if (this.fadeTimeoutId) {
				window.clearTimeout(this.fadeTimeoutId);
			}
			this.fadeTimeoutId = window.setTimeout(() => {
				if (!this.isVisible) {
					this.isOverflowHidden = true;
				}
			}, FADE_ANIMATION_DURATION);
		},
	},
	data () {
		return {
			isVisible: this.open,
			isOverflowHidden: !this.open,
			fadeTimeoutId: undefined,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';
@import (reference) '../../styles/mixins';

.Tooltip {
	@_contentBgColor: @colors_light0;
	@_borderColor: @colors_light2;

	position: relative;
	font-size: 0;

	&_content {
		.transition(opacity);
		background-color: @_contentBgColor;
		border: 1px solid @_borderColor;
		border-radius: 4px;
		font-size: .8rem;
		padding: .5rem;
		position: absolute;
		top: 0;
		left: 1.5rem;
		opacity: 0;
		max-width: 15rem;
	}

	&_icon {
		font-size: 1rem;
		cursor: pointer;
	}

	&-visible {
		.Tooltip_content {
			opacity: 1;
		}
	}

	&-overflowHidden {
		overflow: hidden;
		width: 1rem;
		height: 1rem;
	}
}
</style>
