<template>
	<router-link
		:to="model.linkTo"
		class="HomeCard"
	>
		<div class="HomeCard_iconContainer">
			<Icon
				v-if="model.icon"
				:type="model.icon"
			/>
		</div>

		<div class="HomeCard_details">
			<div
				v-if="model.title"
				class="HomeCard_title"
			>
					{{ model.title }}
			</div>
			<div
				v-if="model.description || model.descriptionHtml"
				v-html="model.descriptionHtml"
				class="HomeCard_description"
			>
					{{ model.description }}
			</div>
		</div>
	</router-link>
</template>

<script>
import Icon from '../common/Icon';

export default {
	name: 'HomeCard',
	components: {
		Icon,
	},
	props: {
		model: {
			required: true,
			type: Object,
		},
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/mixins.less';

.HomeCard {
	@_fontColor: #4f90bb;
	@_fontColor-hover: #457fa5;
	@_boxColor: #d6e3ec;
	@_boxColor-hover: #b8d6eb;

	.transition(color, box-shadow);
	box-shadow: 0px 0px 4px 3px @_boxColor;
	padding: 2rem;
	padding-left: 0;
	color: @_fontColor;
	display: flex;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
	// flex-grow: 1;

	&_iconContainer {
		font-size: 5rem;
		width: 12rem;
		text-align: center;
		flex-grow: 0;
		flex-shrink: 0;
	}

	&_title {
		font-size: 2rem;
		line-height: 2rem;
		font-weight: 500;
		margin-bottom: 1rem;
	}

	&_description {
		font-size: 1rem;
		line-height: 1rem;
	}

	&_details {
		// flex-basis: auto;
	}

	&:hover {
		cursor: pointer;
		color: @_fontColor-hover;
		box-shadow: 0px 0px 4px 3px @_boxColor-hover;
	}
}
</style>
