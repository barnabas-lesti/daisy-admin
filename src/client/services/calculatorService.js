class CalculatorService {
	getNutritionSummaryForRecipeItem (recipeItem) {
		const nutritionSummary = {};
		const servingValue = recipeItem.serving.value;
		const macros = recipeItem.food.macros;
		nutritionSummary.calories = macros.calories.servingMultiplier * servingValue;
		nutritionSummary.carbs = macros.carbs.servingMultiplier * servingValue;
		nutritionSummary.fat = macros.fat.servingMultiplier * servingValue;
		nutritionSummary.protein = macros.protein.servingMultiplier * servingValue;
		return nutritionSummary;
	}

	getNutritionSummaryForRecipe (recipe) {
		const nutritionSummary = {
			calories: 0,
			carbs: 0,
			fat: 0,
			protein: 0,
		};
		for (const item of recipe.items) {
			const itemNutritionSummary = this.getNutritionSummaryForRecipeItem(item);
			nutritionSummary.calories += itemNutritionSummary.calories;
			nutritionSummary.carbs += itemNutritionSummary.carbs;
			nutritionSummary.fat += itemNutritionSummary.fat;
			nutritionSummary.protein += itemNutritionSummary.protein;
		}
		return nutritionSummary;
	}
}

export default new CalculatorService();
