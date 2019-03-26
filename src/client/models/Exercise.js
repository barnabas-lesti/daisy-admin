export default class Exercise {
	constructor (skeleton = {}) {
		this.name = skeleton.name;
		this.description = skeleton.description;
		this.calorieBurn = skeleton.calorieBurn || {};
		this.duration = skeleton.duration || {};
	}
}
