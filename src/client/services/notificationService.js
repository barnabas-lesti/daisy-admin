import Notification from '../models/Notification';

const INTERVAL_STEP = 1000;
const DEFAULT_NOTIFICATION_LIFESPAN = 3000;

class NotificationService {
	constructor () {
		this._notifications = [];
	}

	info (content) {
		this.addNotification({
			content,
		});
	}

	success (content) {
		this.addNotification({
			type: 'success',
			content,
		});
	}

	error (content) {
		this.addNotification({
			type: 'error',
			content,
		});
	}

	addNotification (skeleton) {
		this._notifications.push(new Notification(skeleton));
	}

	removeNotificationByIndex (index) {
		this._notifications.splice(index, 1);
	}

	getNotifications () {
		return this._notifications;
	}

	starCleanupInterval () {
		this._cleanupIntervalId = window.setInterval(() => {
			if (this._notifications.length) {
				const timePoint = (new Date()).getTime() - DEFAULT_NOTIFICATION_LIFESPAN;
				const filtered = this._notifications.filter(item => {
					return item.createdAt > timePoint;
				});
				this._notifications.splice(0, this._notifications.length);
				this._notifications.push(...filtered);
			}
		}, INTERVAL_STEP);
	}

	stopCleanupInterval () {
		if (this._cleanupIntervalId) {
			window.clearInterval(this._cleanupIntervalId);
		}
	}
}

export default new NotificationService();
