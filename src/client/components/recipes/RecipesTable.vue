<template>
	<div class="RecipesTable">
		<p v-if="recipes.length === 0">
			No recipes found.
		</p>

		<div
			v-else
			class="table table-fullWidth table-hoverable"
		>
			<div class="table_header">
				<div class="table_row">
					<div class="table_cell">Name</div>
					<div class="table_cell">Calories</div>
					<div class="table_cell">Carbs</div>
					<div class="table_cell">Protein</div>
					<div class="table_cell">Fat</div>
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
					<div class="table_cell">{{ recipe.nutritionSummary.calories.toFixed(0) }} kcal</div>
					<div class="table_cell">{{ recipe.nutritionSummary.carbs.toFixed(0) }} g</div>
					<div class="table_cell">{{ recipe.nutritionSummary.protein.toFixed(0) }} g</div>
					<div class="table_cell">{{ recipe.nutritionSummary.fat.toFixed(0) }} g</div>
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
