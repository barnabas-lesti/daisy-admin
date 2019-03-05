import NutritionSummary from '../models/NutritionSummary';

class CalculatorService {
	getNutritionSummaryFromRecipeItem (recipeItem) {
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

	getNutritionSummaryFromRecipeItems (recipeItems) {
		const nutritionSummary = new NutritionSummary();
		for (const item of recipeItems) {
			const itemNutritionSummary = this.getNutritionSummaryFromRecipeItem(item);
			nutritionSummary.calories += itemNutritionSummary.calories;
			nutritionSummary.carbs += itemNutritionSummary.carbs;
			nutritionSummary.fat += itemNutritionSummary.fat;
			nutritionSummary.protein += itemNutritionSummary.protein;
		}
		return nutritionSummary;
	}

	getNutritionSummaryFromRecipe (recipe) {
		return this.getNutritionSummaryFromRecipeItems(recipe.items);
	}

	getNutritionSummaryPercentagesFromNutritionSummary (nutritionSummary) {
		const divider = nutritionSummary.protein + nutritionSummary.fat + nutritionSummary.carbs;
		return {
			protein: (nutritionSummary.protein / divider * 100) || 0,
			fat: (nutritionSummary.fat / divider * 100) || 0,
			carbs: (nutritionSummary.carbs / divider * 100) || 0,
		};
	}

	getServingMultipliedMacro (macro, serving) {
		return macro.servingMultiplier * (serving.value || 0);
	}
}

export default new CalculatorService();
