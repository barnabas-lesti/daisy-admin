export default class StoreError extends Error {
  constructor (type, message = `Type "${type}" store error occurred`) {
    super(message);
    this.type = type;
  }
}
