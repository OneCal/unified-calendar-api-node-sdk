/**
 * Tests for error classes
 */

import { describe, it, expect } from 'vitest';
import {
  UnifiedCalendarApiError,
  APIRequestError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  RateLimitError,
} from '../../src/utils/errors';

describe('Error Classes', () => {
  describe('UnifiedCalendarApiError', () => {
    it('should create base error', () => {
      const error = new UnifiedCalendarApiError('Something went wrong');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UnifiedCalendarApiError);
      expect(error.message).toBe('Something went wrong');
      expect(error.name).toBe('UnifiedCalendarApiError');
    });
  });

  describe('APIRequestError', () => {
    it('should create API request error', () => {
      const error = new APIRequestError('Request failed', 500, 'SERVER_ERROR', {
        detail: 'Internal error',
      });
      expect(error).toBeInstanceOf(UnifiedCalendarApiError);
      expect(error).toBeInstanceOf(APIRequestError);
      expect(error.message).toBe('Request failed');
      expect(error.status).toBe(500);
      expect(error.code).toBe('SERVER_ERROR');
      expect(error.details).toEqual({ detail: 'Internal error' });
      expect(error.name).toBe('APIRequestError');
    });

    it('should work without code and details', () => {
      const error = new APIRequestError('Request failed', 500);
      expect(error.status).toBe(500);
      expect(error.code).toBeUndefined();
      expect(error.details).toBeUndefined();
    });
  });

  describe('ValidationError', () => {
    it('should create validation error', () => {
      const errors = {
        email: 'Invalid email format',
        name: 'Name is required',
      };
      const error = new ValidationError('Validation failed', errors);
      expect(error).toBeInstanceOf(UnifiedCalendarApiError);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toBe('Validation failed');
      expect(error.errors).toEqual(errors);
      expect(error.name).toBe('ValidationError');
    });

    it('should work without errors object', () => {
      const error = new ValidationError('Validation failed');
      expect(error.errors).toEqual({});
    });
  });

  describe('AuthenticationError', () => {
    it('should create authentication error', () => {
      const error = new AuthenticationError('Invalid API key');
      expect(error).toBeInstanceOf(APIRequestError);
      expect(error).toBeInstanceOf(AuthenticationError);
      expect(error.message).toBe('Invalid API key');
      expect(error.status).toBe(401);
      expect(error.code).toBe('AUTHENTICATION_ERROR');
      expect(error.name).toBe('AuthenticationError');
    });

    it('should use default message', () => {
      const error = new AuthenticationError();
      expect(error.message).toBe('Authentication failed');
    });
  });

  describe('AuthorizationError', () => {
    it('should create authorization error', () => {
      const error = new AuthorizationError('Access denied');
      expect(error).toBeInstanceOf(APIRequestError);
      expect(error).toBeInstanceOf(AuthorizationError);
      expect(error.message).toBe('Access denied');
      expect(error.status).toBe(403);
      expect(error.code).toBe('AUTHORIZATION_ERROR');
      expect(error.name).toBe('AuthorizationError');
    });

    it('should use default message', () => {
      const error = new AuthorizationError();
      expect(error.message).toBe('Insufficient permissions');
    });
  });

  describe('NotFoundError', () => {
    it('should create not found error', () => {
      const error = new NotFoundError('Calendar not found');
      expect(error).toBeInstanceOf(APIRequestError);
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toBe('Calendar not found');
      expect(error.status).toBe(404);
      expect(error.code).toBe('NOT_FOUND');
      expect(error.name).toBe('NotFoundError');
    });

    it('should use default message', () => {
      const error = new NotFoundError();
      expect(error.message).toBe('Resource not found');
    });
  });

  describe('RateLimitError', () => {
    it('should create rate limit error', () => {
      const error = new RateLimitError('Too many requests', 60);
      expect(error).toBeInstanceOf(APIRequestError);
      expect(error).toBeInstanceOf(RateLimitError);
      expect(error.message).toBe('Too many requests');
      expect(error.status).toBe(429);
      expect(error.code).toBe('RATE_LIMIT_EXCEEDED');
      expect(error.retryAfter).toBe(60);
      expect(error.name).toBe('RateLimitError');
    });

    it('should use default message', () => {
      const error = new RateLimitError();
      expect(error.message).toBe('Rate limit exceeded');
    });

    it('should work without retryAfter', () => {
      const error = new RateLimitError('Too many requests');
      expect(error.retryAfter).toBeUndefined();
    });
  });
});
