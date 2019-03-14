export default class Exercise {
	constructor (skeleton = {}) {
		this.name = skeleton.name;
		this.description = skeleton.description;
		this.activity = skeleton.activity || {};
		this.calorieBurn = skeleton.calorieBurn || {};
	}
}
