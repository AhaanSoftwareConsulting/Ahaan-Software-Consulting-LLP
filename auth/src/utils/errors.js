class AppError extends Error {
  constructor(message, statusCode = 400, errorCode = 'APP_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

class InvalidCredentialsError extends AppError {
  constructor(message = 'Invalid email or password') {
    super(message, 401, 'INVALID_CREDENTIALS');
  }
}

class AccountLockedError extends AppError {
  constructor(message = 'Account temporarily locked due to failed login attempts') {
    super(message, 423, 'ACCOUNT_LOCKED');
  }
}

class AccountNotVerifiedError extends AppError {
  constructor(message = 'Please verify your email before logging in') {
    super(message, 403, 'ACCOUNT_NOT_VERIFIED');
  }
}

class UserAlreadyExistsError extends AppError {
  constructor(message = 'A user with this email already exists') {
    super(message, 409, 'USER_ALREADY_EXISTS');
  }
}

class UserNotFoundError extends AppError {
  constructor(message = 'User not found') {
    super(message, 404, 'USER_NOT_FOUND');
  }
}

class InvalidTokenError extends AppError {
  constructor(message = 'Token is invalid or expired') {
    super(message, 401, 'INVALID_TOKEN');
  }
}

class TokenRevokedError extends AppError {
  constructor(message = 'Token has been revoked') {
    super(message, 401, 'TOKEN_REVOKED');
  }
}

class ValidationError extends AppError {
  constructor(message = 'Invalid request data', details = []) {
    super(message, 422, 'VALIDATION_ERROR');
    this.details = details;
  }
}

module.exports = {
  AppError,
  InvalidCredentialsError,
  AccountLockedError,
  AccountNotVerifiedError,
  UserAlreadyExistsError,
  UserNotFoundError,
  InvalidTokenError,
  TokenRevokedError,
  ValidationError,
};
