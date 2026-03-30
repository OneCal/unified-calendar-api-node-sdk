/**
 * Main Unified Calendar API SDK client
 */

import { BaseClient } from './BaseClient';
import { Calendars } from '../resources/Calendars';
import { Events } from '../resources/Events';
import { EndUserAccounts } from '../resources/EndUserAccounts';
import { FreeBusy } from '../resources/FreeBusy';
import { CalendarSubscriptions } from '../resources/CalendarSubscriptions';
import { BasicAuth } from '../resources/BasicAuth';
import { UnifiedCalendarApiConfig } from '../types';

/**
 * Unified Calendar API Client
 */
export class UnifiedCalendarApi {
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

  /** Basic auth operations (Apple iCloud) */
  public readonly basicAuth: BasicAuth;

  /**
   * Create a new Unified Calendar API client
   * @param config - Configuration options
   */
  constructor(config: UnifiedCalendarApiConfig) {
    this.baseClient = new BaseClient(config);

    this.calendars = new Calendars(this.baseClient);
    this.events = new Events(this.baseClient);
    this.endUserAccounts = new EndUserAccounts(this.baseClient);
    this.freeBusy = new FreeBusy(this.baseClient);
    this.calendarSubscriptions = new CalendarSubscriptions(this.baseClient);
    this.basicAuth = new BasicAuth(this.baseClient);
  }
}
