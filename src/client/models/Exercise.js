export default class Exercise {
	constructor (skeleton = {}) {
		this._id = skeleton._id;
		this.name = skeleton.name;
		this.description = skeleton.description;
		this.calorieBurn = skeleton.calorieBurn || {};
		this.duration = skeleton.duration || {};
	}
}
