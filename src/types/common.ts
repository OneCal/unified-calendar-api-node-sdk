/**
 * Core types for the OneCal Unified Calendar API SDK
 */

export interface OneCalConfig {
  /**
   * Your OneCal API key (required)
   */
  apiKey: string;

  /**
   * Base URL for the API (default: https://api.onecalunified.com)
   */
  baseURL?: string;

  /**
   * Request timeout in milliseconds (default: 30000)
   */
  timeout?: number;

  /**
   * Enable debug logging
   */
  debug?: boolean;
}

export interface PaginationParams {
  /**
   * Page token for pagination
   */
  pageToken?: string;

  /**
   * Number of results per page
   */
  pageSize?: number;

  /**
   * Sync token for incremental sync
   */
  syncToken?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pageToken?: string;
  nextPageToken?: string;
  syncToken?: string;
}

export interface APIResponse<T> {
  data: T;
  success?: boolean;
  message?: string;
}

export interface APIError {
  code?: string;
  message: string;
  details?: Record<string, any>;
  status?: number;
}
