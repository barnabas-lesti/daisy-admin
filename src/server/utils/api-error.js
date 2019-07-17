class ApiError extends Error {
  constructor (skeleton) {
    super(skeleton.message || skeleton.code);
    this.code = skeleton.code;
  }
}

module.exports = ApiError;
