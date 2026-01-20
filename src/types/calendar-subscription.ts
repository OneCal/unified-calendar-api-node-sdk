/**
 * Calendar Subscription types
 */

export interface CalendarSubscription {
  id: string;
  endUserAccountId: string;
  calendarId?: string | null;
  webhookUrl: string;
  provider: string;
  expiration?: string | null;
  subscriptionId?: string | null;
  resourceId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCalendarSubscriptionInput {
  webhookUrl: string;
  calendarId?: string;
  rateLimit?: number;
  subscriptionType: 'calendar' | 'event';
}

export interface CreateCalendarSubscriptionResponse {
  webhookSubscriptionId: string;
  endpointSecret: string;
}

export interface ListCalendarSubscriptionsParams {
  pageToken?: string;
  limit?: number;
}
