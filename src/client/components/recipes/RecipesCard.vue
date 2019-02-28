<template>
	<div class="RecipesCard">
		<div class="RecipesCard_content">
			<p class="RecipesCard_title">{{ title }}</p>
			<div class="RecipesCard_description">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RecipesCard',
	props: {
		title: String,
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.RecipesCard {
	@_bgColor: @colors_light0;
	@_boxShadow: @common_aroundBoxShadow;
	@_textColor: @colors_dark1;

	background-color: @_bgColor;
	box-shadow: @_boxShadow;
	color: @_textColor;
	font-size: 1rem;
	max-width: 100%;

	&_content {
		padding: 1rem;
	}

	&_title {
		font-weight: 500;
		font-size: 1.2em;
		margin-bottom: .5rem;
	}

	&_description {
		font-size: .9em;
	}
}
</style>
