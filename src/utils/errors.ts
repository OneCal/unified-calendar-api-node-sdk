/**
 * Custom error classes for the OneCal SDK
 */

/**
 * Base error class for all OneCal SDK errors
 */
export class OneCalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OneCalError';
    Object.setPrototypeOf(this, OneCalError.prototype);
  }
}

/**
 * Error thrown when an API request fails
 */
export class APIRequestError extends OneCalError {
  public readonly status: number;
  public readonly code?: string;
  public readonly details?: Record<string, any>;

  constructor(
    message: string,
    status: number,
    code?: string,
    details?: Record<string, any>
  ) {
    super(message);
    this.name = 'APIRequestError';
    this.status = status;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, APIRequestError.prototype);
  }
}

/**
 * Error thrown when input validation fails
 */
export class ValidationError extends OneCalError {
  public readonly errors: Record<string, string>;

  constructor(message: string, errors: Record<string, string> = {}) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Error thrown when authentication fails
 */
export class AuthenticationError extends APIRequestError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Error thrown when authorization fails
 */
export class AuthorizationError extends APIRequestError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

/**
 * Error thrown when a resource is not found
 */
export class NotFoundError extends APIRequestError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Error thrown when rate limit is exceeded
 */
export class RateLimitError extends APIRequestError {
  public readonly retryAfter?: number;

  constructor(message: string = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}
