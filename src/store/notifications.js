import Notification from '../models/notification';

export const state = () => ({
  notification: null,
});

export const mutations = {
  showInfo (state, { messageKey, payload }) {
    state.notification = new Notification(messageKey, Notification.Types.INFO, payload);
  },
  showSuccess (state, { messageKey, payload }) {
    state.notification = new Notification(messageKey, Notification.Types.SUCCESS, payload);
  },
  showError (state, { messageKey, payload }) {
    state.notification = new Notification(messageKey, Notification.Types.ERROR, payload);
  },
  clear (state) {
    state.notification = null;
  },
};
