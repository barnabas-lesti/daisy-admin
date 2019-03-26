import Food from './Food';

export default class RecipeItem {
	constructor (food = new Food()) {
		this.serving = {
			value: food.serving.value,
			unit: food.serving.unit,
		};
		this.food = food;
	}
}
