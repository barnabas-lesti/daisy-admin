import NutritionSummary from '../models/NutritionSummary';

class CalculatorService {
	getNutritionSummaryForRecipeItem (recipeItem) {
		const nutritionSummary = new NutritionSummary();
		const food = recipeItem.food;
		if (food !== null) {
			const servingValue = recipeItem.serving.value;
			const macros = recipeItem.food.macros;
			nutritionSummary.calories = macros.calories.servingMultiplier * servingValue;
			nutritionSummary.carbs = macros.carbs.servingMultiplier * servingValue;
			nutritionSummary.fat = macros.fat.servingMultiplier * servingValue;
			nutritionSummary.protein = macros.protein.servingMultiplier * servingValue;
		}
		return nutritionSummary;
	}

	getNutritionSummaryForRecipe (recipe) {
		const nutritionSummary = new NutritionSummary();
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
