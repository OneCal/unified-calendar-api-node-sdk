/**
 * FreeBusy resource client
 */

import { BaseClient } from '../client/BaseClient';
import { GetFreeBusyInput, FreeBusyResponse } from '../types';

export class FreeBusy {
  constructor(private client: BaseClient) {}

  /**
   * Get free/busy information for calendars
   * @param endUserAccountId - The end user account ID
   * @param data - Free/busy query parameters
   */
  async get(
    endUserAccountId: string,
    data: GetFreeBusyInput
  ): Promise<FreeBusyResponse> {
    return this.client.post<FreeBusyResponse>(
      `/api/v1/freeBusy/${endUserAccountId}`,
      data
    );
  }
}
