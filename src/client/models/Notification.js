export default class Notification {
	constructor (args = {}) {
		this.type = args.type;
		this.content = args.content;
		this.timeoutId = args.timeoutId;
	}
}
