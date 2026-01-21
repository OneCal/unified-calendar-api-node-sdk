/**
 * Calendar Subscription types
 */

export interface CalendarSubscription {
  /** Unique identifier for the calendar subscription */
  id: string;
  
  /** ID of the end user account that owns this subscription */
  endUserAccountId: string;
  
  /** ID of the calendar being subscribed to (optional in case subscription is for all calendars) */
  calendarId?: string | null;
  
  /** URL where webhook notifications will be sent */
  url: string;
  
  /** Calendar provider */
  provider: string;
  
  /** Expiration date/time of the subscription in ISO 8601 format (optional) */
  expiration?: string | null;
  
  /** Provider-specific subscription identifier (optional) */
  subscriptionId?: string | null;
  
  /** Provider-specific resource identifier (optional) */
  resourceId?: string | null;
  
  /** Timestamp when the subscription was created in ISO 8601 format */
  createdAt: string;
  
  /** Timestamp when the subscription was last updated in ISO 8601 format */
  updatedAt: string;
}

export interface CreateCalendarSubscriptionInput {
  /** The unique identifier of the Calendar to subscribe to (Optional, required for event subscriptions) */
  calendarId?: string;
  
  /** The URL where webhook notifications will be sent. Must be a valid HTTPS URL (Required) */
  webhookUrl: string;
  
  /** Rate limit for webhook delivery (messages per second). Minimum value is 1 (Optional, if not provided there will be no rate limit applied) */
  rateLimit?: number;

  /** Type of subscription: 'calendar' for calendar changes or 'event' for event changes (Required) */
  subscriptionType: 'calendar' | 'event';
}

export interface CreateCalendarSubscriptionResponse {
  /** Unique identifier for the created webhook subscription */
  webhookSubscriptionId: string;
  
  /** Secret key for verifying webhook payload signatures */
  endpointSecret: string;
}

export interface ListCalendarSubscriptionsParams {
  /** Pagination token for retrieving the next page of results */
  pageToken?: string;
  
  /** Maximum number of subscriptions to return per page */
  limit?: number;
}
