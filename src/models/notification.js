const Types = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
};

class Notification {
  constructor (messageKey, type = Types.INFO, payload = {}) {
    this.messageKey = messageKey;
    this.type = type;
    this.payload = payload;
  }
}

Notification.Types = Types;

export default Notification;
