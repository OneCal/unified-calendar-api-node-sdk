/**
 * Core types for the Unified Calendar API SDK
 */

export interface UnifiedCalendarApiConfig {
  /**
   * Your Unified Calendar API key (required)
   */
  apiKey: string;

  /**
   * Base URL for the API (default: https://api.onecalunified.com)
   */
  unifiedApiBaseUrl?: string;

  /**
   * Request timeout in milliseconds (default: 30000)
   */
  timeout?: number;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: Record<string, any>;
  status?: number;
}
