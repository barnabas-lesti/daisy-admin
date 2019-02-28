import Food from './Food';

class RecipeItem {
	constructor (food = new Food()) {
		this.serving = {
			value: food.serving.value,
		};
		this.food = food;
	}
}

export default RecipeItem;
