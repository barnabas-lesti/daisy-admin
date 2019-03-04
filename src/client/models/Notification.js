export default class Notification {
	constructor (args = {}) {
		this.type = args.type;
		this.content = args.content;
		this.title = args.title;
		this.createdAt = (new Date().getTime());
	}
}
