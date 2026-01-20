/**
 * Tests for BaseClient
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { BaseClient } from '../../src/client/BaseClient';
import {
  OneCalError,
} from '../../src/utils/errors';

vi.mock('axios');

describe('BaseClient', () => {
  let client: BaseClient;
  const mockAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (axios.create as any).mockReturnValue(mockAxiosInstance);
    client = new BaseClient({ apiKey: 'test-api-key' });
  });

  describe('constructor', () => {
    it('should throw error if API key is not provided', () => {
      expect(() => new BaseClient({ apiKey: '' })).toThrow(OneCalError);
      expect(() => new BaseClient({ apiKey: '' })).toThrow('API key is required');
    });

    it('should create axios instance with correct config', () => {
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'https://api.onecalunified.com',
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'test-api-key',
          'User-Agent': 'unified-calendar-api-node-sdk/0.1.0',
        },
      });
    });

    it('should use custom baseURL if provided', () => {
      new BaseClient({
        apiKey: 'test-key',
        baseURL: 'https://custom.api.com',
      });

      expect(axios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: 'https://custom.api.com',
        })
      );
    });

    it('should use custom timeout if provided', () => {
      new BaseClient({
        apiKey: 'test-key',
        timeout: 60000,
      });

      expect(axios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: 60000,
        })
      );
    });
  });

  describe('HTTP methods', () => {
    it('should make GET request', async () => {
      const mockData = { id: '123', name: 'Test' };
      mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      const result = await client.get('/test');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', undefined);
      expect(result).toEqual(mockData);
    });

    it('should make POST request', async () => {
      const mockData = { id: '123', name: 'Test' };
      const postData = { name: 'New Item' };
      mockAxiosInstance.post.mockResolvedValue({ data: mockData });

      const result = await client.post('/test', postData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', postData, undefined);
      expect(result).toEqual(mockData);
    });

    it('should make PUT request', async () => {
      const mockData = { id: '123', name: 'Updated' };
      const putData = { name: 'Updated Item' };
      mockAxiosInstance.put.mockResolvedValue({ data: mockData });

      const result = await client.put('/test/123', putData);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test/123', putData, undefined);
      expect(result).toEqual(mockData);
    });

    it('should make DELETE request', async () => {
      const mockData = { success: true };
      mockAxiosInstance.delete.mockResolvedValue({ data: mockData });

      const result = await client.delete('/test/123');

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test/123', undefined);
      expect(result).toEqual(mockData);
    });
  });

  describe('buildUrl', () => {
    it('should return path without query params', () => {
      const url = client.buildUrl('/test');
      expect(url).toBe('/test');
    });

    it('should build URL with query params', () => {
      const url = client.buildUrl('/test', {
        param1: 'value1',
        param2: 'value2',
      });
      expect(url).toBe('/test?param1=value1&param2=value2');
    });

    it('should skip undefined and null values', () => {
      const url = client.buildUrl('/test', {
        param1: 'value1',
        param2: undefined,
        param3: null,
        param4: 'value4',
      });
      expect(url).toBe('/test?param1=value1&param4=value4');
    });

    it('should convert Date to ISO string', () => {
      const date = new Date('2026-01-20T10:00:00Z');
      const url = client.buildUrl('/test', { date });
      expect(url).toContain('date=');
      expect(url).toContain(encodeURIComponent(date.toISOString()));
    });

    it('should stringify objects', () => {
      const url = client.buildUrl('/test', {
        filter: { status: 'active' },
      });
      expect(url).toContain('filter=');
    });

    it('should handle boolean values', () => {
      const url = client.buildUrl('/test', {
        active: true,
        disabled: false,
      });
      expect(url).toBe('/test?active=true&disabled=false');
    });
  });

  describe('error handling', () => {
    it('should handle 401 errors', async () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      };
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(client.get('/test')).rejects.toEqual(error);
    });

    it('should handle 403 errors', async () => {
      const error = {
        response: {
          status: 403,
          data: { message: 'Forbidden' },
        },
      };
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(client.get('/test')).rejects.toEqual(error);
    });

    it('should handle 404 errors', async () => {
      const error = {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
      };
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(client.get('/test')).rejects.toEqual(error);
    });

    it('should handle 429 errors', async () => {
      const error = {
        response: {
          status: 429,
          data: { message: 'Too many requests' },
          headers: { 'retry-after': '60' },
        },
      };
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(client.get('/test')).rejects.toEqual(error);
    });

    it('should handle 500 errors', async () => {
      const error = {
        response: {
          status: 500,
          data: { message: 'Internal server error', code: 'SERVER_ERROR' },
        },
      };
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(client.get('/test')).rejects.toEqual(error);
    });

    it('should handle network errors', async () => {
      const error = new Error('Network error');
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(client.get('/test')).rejects.toThrow('Network error');
    });
  });
});
