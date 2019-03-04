import Notification from '../models/Notification';

const DEFAULT_NOTIFICATION_LIFESPAN = 3000;

class NotificationService {
	constructor () {
		this._notifications = [];
	}

	info (content) {
		this._addNotification({
			content,
		});
	}

	success (content) {
		this._addNotification({
			type: 'success',
			content,
		});
	}

	error (content) {
		this._addNotification({
			type: 'error',
			content,
		});
	}

	removeNotificationByIndex (index) {
		this._notifications.splice(index, 1);
	}

	getNotifications () {
		return this._notifications;
	}

	_addNotification (skeleton) {
		const timeoutId = window.setTimeout(() => {
			const filtered = this._notifications.filter(item => {
				return item.timeoutId !== timeoutId;
			});
			this._notifications.splice(0, this._notifications.length);
			this._notifications.push(...filtered);
		}, DEFAULT_NOTIFICATION_LIFESPAN);
		this._notifications.push(new Notification({
			timeoutId,
			...skeleton,
		}));
	}
}

export default new NotificationService();
