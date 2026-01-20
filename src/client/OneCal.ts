/**
 * Main OneCal SDK client
 */

import { BaseClient } from './BaseClient';
import { Calendars } from '../resources/Calendars';
import { Events } from '../resources/Events';
import { EndUserAccounts } from '../resources/EndUserAccounts';
import { FreeBusy } from '../resources/FreeBusy';
import { CalendarSubscriptions } from '../resources/CalendarSubscriptions';
import { OneCalConfig } from '../types';

/**
 * OneCal Unified Calendar API Client
 */
export class OneCal {
  private baseClient: BaseClient;

  /** Calendar operations */
  public readonly calendars: Calendars;

  /** Event operations */
  public readonly events: Events;

  /** End user account operations */
  public readonly endUserAccounts: EndUserAccounts;

  /** Free/busy operations */
  public readonly freeBusy: FreeBusy;

  /** Calendar subscription operations */
  public readonly calendarSubscriptions: CalendarSubscriptions;

  /**
   * Create a new OneCal client
   * @param config - Configuration options
   */
  constructor(config: OneCalConfig) {
    this.baseClient = new BaseClient(config);

    this.calendars = new Calendars(this.baseClient);
    this.events = new Events(this.baseClient);
    this.endUserAccounts = new EndUserAccounts(this.baseClient);
    this.freeBusy = new FreeBusy(this.baseClient);
    this.calendarSubscriptions = new CalendarSubscriptions(this.baseClient);
  }

  /**
   * Get OAuth authorization URL
   * @param appId - Your OneCal application ID
   * @param provider - The provider type (GOOGLE or MICROSOFT)
   * @param params - Optional OAuth parameters
   * @returns The OAuth authorization URL
   */
  getOAuthUrl(
    appId: string,
    provider: 'GOOGLE' | 'MICROSOFT',
    params?: {
      redirectUrl?: string;
      externalId?: string;
      loginHint?: string;
      prompt?: string;
      state?: string;
    }
  ): string {
    const baseUrl =
      this.baseClient['config'].baseURL || 'https://api.onecalunified.com';
    const queryParams = new URLSearchParams();

    if (params?.redirectUrl)
      queryParams.append('redirectUrl', params.redirectUrl);
    if (params?.externalId) queryParams.append('externalId', params.externalId);
    if (params?.loginHint) queryParams.append('loginHint', params.loginHint);
    if (params?.prompt) queryParams.append('prompt', params.prompt);
    if (params?.state) queryParams.append('state', params.state);

    const queryString = queryParams.toString();
    const url = `${baseUrl}/api/v1/oauth/authorize/${appId}/${provider.toLowerCase()}`;

    return queryString ? `${url}?${queryString}` : url;
  }
}
