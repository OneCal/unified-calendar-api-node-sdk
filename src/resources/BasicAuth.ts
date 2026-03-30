/**
 * Basic Auth resource client
 */

import { BaseClient } from '../client/BaseClient';
import { ConnectAppleInput, EndUserAccount } from '../types';

export class BasicAuth {
  constructor(private client: BaseClient) {}

  /**
   * Connect an Apple iCloud account using basic auth (app-specific password)
   * @param appId - Your OneCal application ID
   * @param provider - The basic auth provider (currently only 'apple')
   * @param data - Connection data including email and app-specific password
   */
  async connect(
    appId: string,
    provider: 'apple',
    data: ConnectAppleInput
  ): Promise<EndUserAccount> {
    return this.client.post<EndUserAccount>(
      `/api/v1/basicAuth/connect/${appId}/${provider}`,
      data
    );
  }
}
