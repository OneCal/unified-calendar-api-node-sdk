/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Base HTTP client for making API requests
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { UnifiedCalendarApiConfig } from '../types';
import {
  UnifiedCalendarApiError,
  APIRequestError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  RateLimitError,
} from '../utils/errors';
import { logger } from '../utils/logger';

export class BaseClient {
  private client: AxiosInstance;
  private config: UnifiedCalendarApiConfig;

  constructor(config: UnifiedCalendarApiConfig) {
    if (!config.apiKey) {
      throw new UnifiedCalendarApiError('API key is required');
    }

    this.config = {
      unifiedApiBaseUrl:
        config.unifiedApiBaseUrl || 'https://api.onecalunified.com',
      timeout: config.timeout || 30000,
      ...config,
    };

    this.client = axios.create({
      baseURL: this.config.unifiedApiBaseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.config.apiKey,
        'User-Agent': 'unified-calendar-api-node-sdk/0.1.0',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        logger.debug('API Request', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
        });
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => {
        logger.debug('API Response', {
          status: response.status,
          statusText: response.statusText,
          url: response.config.url,
        });
        return response;
      },
      (error) => {
        logger.error('API Error', {
          message: error.message,
          url: error.config?.url,
          status: error.response?.status,
        });

        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;
          const message = data?.message || error.message;
          const code = data?.code;
          const details = data?.details;

          switch (status) {
            case 401:
              throw new AuthenticationError(message);
            case 403:
              throw new AuthorizationError(message);
            case 404:
              throw new NotFoundError(message);
            case 429: {
              const retryAfter = error.response.headers['retry-after'];
              throw new RateLimitError(
                message,
                retryAfter ? parseInt(retryAfter, 10) : undefined
              );
            }
            default:
              throw new APIRequestError(message, status, code, details);
          }
        }

        throw new UnifiedCalendarApiError(error.message || 'Network error');
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  buildUrl(path: string, params?: Record<string, any>): string {
    if (!params || Object.keys(params).length === 0) {
      return path;
    }

    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof Date) {
          queryParams.append(key, value.toISOString());
        } else if (typeof value === 'object') {
          queryParams.append(key, JSON.stringify(value));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    const queryString = queryParams.toString();
    return queryString ? `${path}?${queryString}` : path;
  }
}
