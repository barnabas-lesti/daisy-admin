export default class Food {
	constructor (skeleton = {}) {
		const { nutrients = {} } = skeleton;
		this.name = skeleton.name || '';
		this.nutrients = {
			calories: nutrients.calories || {},
			carbs: nutrients.carbs || {},
			energy: nutrients.energy || {},
			fat: nutrients.fat || {},
			fiber: nutrients.fiber || {},
			protein: nutrients.protein || {},
			salt: nutrients.salt || {},
			saturatedFat: nutrients.saturatedFat || {},
			sugar: nutrients.sugar || {},
		};
		this.serving = skeleton.serving || {};
	}
}
