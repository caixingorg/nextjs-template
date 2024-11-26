export class AppError extends Error {
  public readonly code: string;
  public readonly status?: number;
  public readonly data?: unknown;

  constructor(message: string, code: string, status?: number, data?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
    this.data = data;

    // 确保原型链正确
    Object.setPrototypeOf(this, AppError.prototype);
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status,
      data: this.data,
    };
  }
}

export class ValidationError extends AppError {
  constructor(message: string, data?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, data);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTHENTICATION_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Permission denied') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

export class ServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 'SERVER_ERROR', 500);
    this.name = 'ServerError';
  }
}
