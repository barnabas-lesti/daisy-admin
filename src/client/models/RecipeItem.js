import Food from './Food';

export default class RecipeItem {
	constructor (food = new Food()) {
		this.serving = {
			value: food.serving.value,
		};
		this.food = food;
	}
}
