class AppError extends Error {
  constructor(message, statusCode) {
    const isMessageObject = typeof message === "object" && message !== null;
    super(isMessageObject ? JSON.stringify(message) : message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`?.startsWith("4") ? "fail" : "error";
  }
}

module.exports = AppError;
