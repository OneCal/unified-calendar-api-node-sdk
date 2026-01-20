/**
 * Calendar Subscriptions resource client
 */

import { BaseClient } from '../client/BaseClient';
import {
  CalendarSubscription,
  CreateCalendarSubscriptionInput,
  CreateCalendarSubscriptionResponse,
  ListCalendarSubscriptionsParams,
} from '../types';

export class CalendarSubscriptions {
  constructor(private client: BaseClient) {}

  /**
   * List calendar subscriptions for an end user account
   * @param endUserAccountId - The end user account ID
   * @param params - Optional pagination parameters
   */
  async list(
    endUserAccountId: string,
    params?: ListCalendarSubscriptionsParams
  ): Promise<{ data: CalendarSubscription[]; nextPageToken?: string }> {
    const url = this.client.buildUrl(
      `/api/v1/calendarSubscriptions/${endUserAccountId}`,
      params
    );
    return this.client.get(url);
  }

  /**
   * Create a calendar subscription
   * @param endUserAccountId - The end user account ID
   * @param data - Subscription data
   */
  async create(
    endUserAccountId: string,
    data: CreateCalendarSubscriptionInput
  ): Promise<CreateCalendarSubscriptionResponse> {
    return this.client.post<CreateCalendarSubscriptionResponse>(
      `/api/v1/calendarSubscriptions/${endUserAccountId}`,
      data
    );
  }

  /**
   * Delete a calendar subscription
   * @param endUserAccountId - The end user account ID
   * @param subscriptionId - The subscription ID
   */
  async delete(
    endUserAccountId: string,
    subscriptionId: string
  ): Promise<{ success: boolean }> {
    return this.client.delete(
      `/api/v1/calendarSubscriptions/${endUserAccountId}`,
      { data: { subscriptionId } }
    );
  }
}
