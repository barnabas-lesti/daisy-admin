
export default class CalculatorItem {
	constructor () {
		this.serving = {};
		this.name = '';
		this.itemId = '';
		this.nutrients = {
			calories: {
				servingMultiplier: 0,
			},
			carbs: {
				servingMultiplier: 0,
			},
			protein: {
				servingMultiplier: 0,
			},
			fat: {
				servingMultiplier: 0,
			},
		};
	}
}
