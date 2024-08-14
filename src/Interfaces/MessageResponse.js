// MessageResponse.js

class SuccessResponse {
  constructor(message, data) {
    this.success = true;
    this.message = message;
    this.data = data || null;
  }
}

class ErrorResponse {
  constructor(message, errorDetails) {
    this.success = false;
    this.message = message;
    this.error = errorDetails || null;
  }
}

module.exports = {
  SuccessResponse,
  ErrorResponse,
};
