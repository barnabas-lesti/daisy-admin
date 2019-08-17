export default class AppError extends Error {
  constructor (type, message = `Type "${type}" app error occurred`) {
    super(message);
    this.type = type;
  }
}
