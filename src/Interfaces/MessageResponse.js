class SuccessResponse {
  constructor(message = 'Operation successful', data = null) {
    this.message = message;
    if (data !== undefined) {
      this.data = data;
    }
  }
}

class ErrorResponse {
  constructor(message = 'An error occurred', errorDetails = null) {
    this.message = message;
    this.error = errorDetails;
  }
}

module.exports = {
  SuccessResponse,
  ErrorResponse,
};
