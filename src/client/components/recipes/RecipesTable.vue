<template>
	<div class="RecipesTable">
		<p v-if="recipes.length === 0">
			{{ $t('recipes.table.noRecipeFound') }}
		</p>

		<div
			v-else
			class="table table-fullWidth table-hoverable"
		>
			<div class="table_header">
				<div class="table_row">
					<div class="table_cell">{{ $t('recipes.table.header.name') }}</div>
					<div class="table_cell">{{ $t('recipes.table.header.calories') }}</div>
					<div class="table_cell">{{ $t('recipes.table.header.carbs') }}</div>
					<div class="table_cell">{{ $t('recipes.table.header.protein') }}</div>
					<div class="table_cell">{{ $t('recipes.table.header.fat') }}</div>
				</div>
			</div>
			<div class="table_body">
				<router-link
					v-for="(recipe, index) of computedRecipes"
					class="table_row"
					:key="index"
					:to="{
						name: 'recipeEdit',
						params: {
							_id: recipe._id,
							recipe,
						},
					}"
				>
					<div class="table_cell">{{ recipe.name }}</div>
					<div class="table_cell">{{ recipe.nutritionSummary.calories.toFixed(0) }} {{ $t('common.units.calories') }}</div>
					<div class="table_cell">{{ recipe.nutritionSummary.carbs.toFixed(0) }} {{ $t('common.units.grams') }}</div>
					<div class="table_cell">{{ recipe.nutritionSummary.protein.toFixed(0) }} {{ $t('common.units.grams') }}</div>
					<div class="table_cell">{{ recipe.nutritionSummary.fat.toFixed(0) }} {{ $t('common.units.grams') }}</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import calculatorService from '../../services/calculatorService';

export default {
	name: 'RecipesTable',
	props: {
		recipes: {
			default: () => [],
			type: Array,
		},
	},
	computed: {
		computedRecipes () {
			return this.recipes
				.map(recipe => {
					recipe.nutritionSummary = calculatorService.getNutritionSummaryFromRecipe(recipe);
					return recipe;
				});
		},
	},
};
</script>
