export default class Recipe {
	constructor (skeleton = {}) {
		this._id = skeleton._id;
		this.name = skeleton.name || '';
		this.name = skeleton.name || '';
		this.description = skeleton.description || '';
		this.items = skeleton.items || [];
	}
}
