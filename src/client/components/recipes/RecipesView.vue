<template>
	<div class="RecipesView">
		<h1>Recipes</h1>

		<div class="columns">
			<div class="column is-two-thirds">
				<RecipesTable
					:initialItems="tableModel"
				/>
			</div>
			<div class="column">
				<RecipesFoodSelector
					@select="onFoodSelect($event)"
					autoSearch
				/>
			</div>
		</div>
	</div>
</template>

<script>
import RecipesFoodSelector from './RecipesFoodSelector';
import RecipesTable from './RecipesTable';

export default {
	name: 'RecipesView',
	components: {
		RecipesFoodSelector,
		RecipesTable,
	},
	methods: {
		onFoodSelect ({ selectedItem }) {
			this.tableModel.push(selectedItem);
		},
	},
	data () {
		return {
			tableModel: [],
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/partials';
@import (reference) '../../styles/variables';

.RecipesView {
	&:extend(.page all);
}
</style>
