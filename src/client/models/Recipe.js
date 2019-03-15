export default class Recipe {
	constructor (skeleton = {}) {
		this.name = skeleton.name || '';
		this.description = skeleton.description || '';
		this.items = skeleton.items || [];
	}
}
