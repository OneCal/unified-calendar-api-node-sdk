/**
 * End User Accounts resource client
 */

import { BaseClient } from '../client/BaseClient';
import {
  EndUserAccount,
  EndUserAccountCredential,
  CreateEndUserAccountInput,
  ListEndUserAccountsParams,
  ListEndUserAccountsResponse,
} from '../types';

export class EndUserAccounts {
  constructor(private client: BaseClient) {}

  /**
   * List all end user accounts
   * @param params - Optional pagination and filter parameters
   */
  async list(
    params?: ListEndUserAccountsParams
  ): Promise<ListEndUserAccountsResponse> {
    const url = this.client.buildUrl(`/api/v1/endUserAccounts`, params);
    return this.client.get<ListEndUserAccountsResponse>(url);
  }

  /**
   * Get a specific end user account
   * @param id - The end user account ID
   */
  async get(id: string): Promise<EndUserAccount> {
    return this.client.get<EndUserAccount>(`/api/v1/endUserAccounts/${id}`);
  }

  /**
   * Create a new end user account with credentials
   * @param data - End user account creation data
   */
  async create(data: CreateEndUserAccountInput): Promise<EndUserAccount> {
    return this.client.post<EndUserAccount>(`/api/v1/endUserAccounts`, data);
  }

  /**
   * Delete an end user account
   * @param id - The end user account ID
   */
  async delete(id: string): Promise<{ success: boolean }> {
    return this.client.delete(`/api/v1/endUserAccounts/${id}`);
  }

  /**
   * Get credentials for an end user account
   * This will automatically refresh credentials if they are expired
   * @param id - The end user account ID
   */
  async getCredentials(id: string): Promise<EndUserAccountCredential> {
    return this.client.get<EndUserAccountCredential>(
      `/api/v1/endUserAccounts/${id}/credentials`
    );
  }
}
