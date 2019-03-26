import CalculatorItem from '../models/CalculatorItem';
import Food from '../models/Food';
import NutritionSummary from '../models/NutritionSummary';
import RecipeItem from '../models/RecipeItem';

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

	getNutritionSummaryFromCalculatorItem (calculatorItem) {
		const nutritionSummary = new NutritionSummary();
		if (calculatorItem !== null) {
			const servingValue = calculatorItem.serving.value;
			const nutrients = calculatorItem.nutrients;
			nutritionSummary.calories = nutrients.calories.servingMultiplier * servingValue;
			nutritionSummary.carbs = nutrients.carbs.servingMultiplier * servingValue;
			nutritionSummary.fat = nutrients.fat.servingMultiplier * servingValue;
			nutritionSummary.protein = nutrients.protein.servingMultiplier * servingValue;
		}
		return nutritionSummary;
	}

	getNutritionSummaryFromCalculatorItems (calculatorItems) {
		const nutritionSummary = new NutritionSummary();
		for (const item of calculatorItems) {
			const itemNutritionSummary = this.getNutritionSummaryFromCalculatorItem(item);
			nutritionSummary.calories += itemNutritionSummary.calories;
			nutritionSummary.carbs += itemNutritionSummary.carbs;
			nutritionSummary.fat += itemNutritionSummary.fat;
			nutritionSummary.protein += itemNutritionSummary.protein;
		}
		return nutritionSummary;
	}

	getServingMultipliedMacro (macro, serving) {
		return macro.servingMultiplier * (serving.value || 0);
	}

	convertFoodToCalculatorItem (food) {
		const calculatorItem = new CalculatorItem();
		const foodNutrients = food.nutrients;
		calculatorItem.type = 'food';
		calculatorItem.itemId = food._id;
		calculatorItem.name = food.name;
		calculatorItem.serving = food.serving;
		calculatorItem.nutrients = food.nutrients;
		calculatorItem.nutrients = {
			calories: { servingMultiplier: foodNutrients.calories.servingMultiplier },
			carbs: { servingMultiplier: foodNutrients.carbs.servingMultiplier },
			protein: { servingMultiplier: foodNutrients.protein.servingMultiplier },
			fat: { servingMultiplier: foodNutrients.fat.servingMultiplier },
		};
		return calculatorItem;
	}

	convertCalculatorItemToFood (calculatorItem) {
		const food = new Food();
		const { nutrients } = calculatorItem;
		food._id = calculatorItem.itemId;
		food.nutrients = nutrients;
		food.name = calculatorItem.name;
		food.serving = calculatorItem.serving;
		return food;
	}

	convertRecipeToCalculatorItem (recipe) {
		const calculatorItem = new CalculatorItem();
		const nutrientSummary = this.getNutritionSummaryFromRecipe(recipe);

		calculatorItem.type = 'recipe';
		calculatorItem.name = recipe.name;
		calculatorItem.serving = {
			value: 1,
			unit: 'plates',
		};
		calculatorItem.nutrients = {
			calories: { servingMultiplier: nutrientSummary.calories },
			carbs: { servingMultiplier: nutrientSummary.carbs },
			protein: { servingMultiplier: nutrientSummary.protein },
			fat: { servingMultiplier: nutrientSummary.fat },
		};
		return calculatorItem;
	}

	convertRecipeItemToCalculatorItem (recipeItem) {
		const { food } = recipeItem;
		const calculatorItem = this.convertFoodToCalculatorItem(food);
		calculatorItem.serving.value = recipeItem.serving.value;
		return calculatorItem;
	}

	convertCalculatorItemToRecipeItem (calculatorItem) {
		const recipeItem = new RecipeItem();
		recipeItem.serving = calculatorItem.serving;
		recipeItem.food = this.convertCalculatorItemToFood(calculatorItem);
		return recipeItem;
	}

	convertExerciseToCalculatorItem (exercise) {
		const calculatorItem = new CalculatorItem();

		calculatorItem.type = 'exercise';
		calculatorItem.name = exercise.name;
		calculatorItem.serving = {
			value: exercise.duration.value,
			unit: 'minutes',
		};
		calculatorItem.nutrients.calories = {
			servingMultiplier: (exercise.calorieBurn.durationMultiplier || 0) * -1,
		};
		return calculatorItem;
	}
}

export default new CalculatorService();
