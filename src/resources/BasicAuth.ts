/**
 * Basic Auth resource client
 */

import { BaseClient } from '../client/BaseClient';
import { ConnectAppleInput, ConnectCalDavInput, EndUserAccount } from '../types';

export class BasicAuth {
  constructor(private client: BaseClient) {}

  /**
   * Connect an Apple iCloud account using an app-specific password
   * @param appId - Your Apiroc application ID
   * @param provider - 'apple'
   * @param data - Apple ID email and app-specific password
   */
  async connect(
    appId: string,
    provider: 'apple',
    data: ConnectAppleInput
  ): Promise<EndUserAccount>;
  /**
   * Connect an account on any CalDAV server (Fastmail, Nextcloud, Zoho, ...)
   * @param appId - Your Apiroc application ID
   * @param provider - 'caldav'
   * @param data - Server URL, login and (app-specific) password
   */
  async connect(
    appId: string,
    provider: 'caldav',
    data: ConnectCalDavInput
  ): Promise<EndUserAccount>;
  async connect(
    appId: string,
    provider: 'apple' | 'caldav',
    data: ConnectAppleInput | ConnectCalDavInput
  ): Promise<EndUserAccount> {
    return this.client.post<EndUserAccount>(
      `/api/v1/basicAuth/connect/${appId}/${provider}`,
      data
    );
  }
}
