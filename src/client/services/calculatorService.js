import NutritionSummary from '../models/NutritionSummary';

class CalculatorService {
	getNutritionSummaryFromRecipeItem (recipeItem) {
		const nutritionSummary = new NutritionSummary();
		const food = recipeItem.food;
		if (food !== null) {
			const servingValue = recipeItem.serving.value;
			const nutrients = food.nutrients;
			nutritionSummary.calories = nutrients.calories.servingMultiplier * servingValue;
			nutritionSummary.carbs = nutrients.carbs.servingMultiplier * servingValue;
			nutritionSummary.fat = nutrients.fat.servingMultiplier * servingValue;
			nutritionSummary.protein = nutrients.protein.servingMultiplier * servingValue;
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
