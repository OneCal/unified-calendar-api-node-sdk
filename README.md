# OneCal Unified Calendar API - Node.js SDK

Official Node.js/TypeScript SDK for the [OneCal Unified Calendar API](https://docs.onecalunified.com). Manage calendars, events, and integrations across Google Calendar, Microsoft Outlook, and other providers with a single, unified interface.

## Features

✨ **Unified Interface** - Work with multiple calendar providers through one consistent API  
🔒 **Type-Safe** - Full TypeScript support with comprehensive type definitions  
📦 **Modern** - ESM and CommonJS support  
🚀 **Simple** - Intuitive, promise-based API  
📚 **Well-Documented** - Extensive documentation and examples  
🧪 **Tested** - Comprehensive test coverage  

## Installation

```bash
npm install @onecal/unified-calendar-api-node-sdk
```

Or using yarn:

```bash
yarn add @onecal/unified-calendar-api-node-sdk
```

Or using pnpm:

```bash
pnpm add @onecal/unified-calendar-api-node-sdk
```

## Quick Start

```typescript
import { UnifiedCalendarApi } from '@onecal/unified-calendar-api-node-sdk';

// Initialize the client
const client = new UnifiedCalendarApi({
  apiKey: 'your-api-key-here'
});

// List calendars
const calendars = await client.calendars.list('endUserAccountId');

// Create an event
const event = await client.events.create('endUserAccountId', 'calendarId', {
  title: 'Team Meeting',
  start: {
    dateTime: '2026-01-20T10:00:00Z',
    timeZone: 'UTC'
  },
  end: {
    dateTime: '2026-01-20T11:00:00Z',
    timeZone: 'UTC'
  },
  attendees: [
    { email: 'team@example.com', name: 'Team Member' }
  ]
});

console.log(`Created event: ${event.title}`);
```

## Configuration

```typescript
const client = new UnifiedCalendarApi({
  apiKey: 'your-api-key',           // Required: Your Unified Calendar API key
  unifiedApiBaseUrl: 'https://api.onecalunified.com', // Optional: API base URL
  timeout: 30000,                    // Optional: Request timeout in ms
  debug: false                       // Optional: Enable debug logging
});
```

## API Reference

### End User Accounts

Manage end user accounts that connect to calendar providers.

```typescript
// List all end user accounts
const accounts = await client.endUserAccounts.list({
  limit: 20,
  search: 'user@example.com',
  statusFilter: 'active'
});

// Get a specific account
const account = await client.endUserAccounts.get('accountId');

// Create a new account
const newAccount = await client.endUserAccounts.create({
  email: 'user@example.com',
  refreshToken: 'refresh-token',
  providerType: ProviderType.GOOGLE,
  externalId: 'user-123'
});

// Get account credentials (automatically refreshes if expired)
const credentials = await client.endUserAccounts.getCredentials('accountId');

// Delete an account
await client.endUserAccounts.delete('accountId');
```

### Calendars

Manage calendars for end user accounts.

```typescript
// List calendars
const calendars = await client.calendars.list('endUserAccountId', {
  pageSize: 20
});

// Get a specific calendar
const calendar = await client.calendars.get('endUserAccountId', 'calendarId');

// Create a calendar
const newCalendar = await client.calendars.create('endUserAccountId', {
  name: 'My Calendar',
  hexColor: '#FF5733',
  timeZone: 'America/New_York'
});

// Update a calendar
const updated = await client.calendars.update('endUserAccountId', 'calendarId', {
  name: 'Updated Calendar Name'
});

// Delete a calendar
await client.calendars.delete('endUserAccountId', 'calendarId');
```

### Events

Create, read, update, and delete calendar events.

```typescript
// List events
const events = await client.events.list('endUserAccountId', 'calendarId', {
  startDateTime: new Date('2026-01-01'),
  endDateTime: new Date('2026-12-31'),
  search: 'meeting',
  orderBy: EventOrderBy.START_TIME,
  pageSize: 50
});

// Get a specific event
const event = await client.events.get('endUserAccountId', 'calendarId', 'eventId');

// Create an event
const newEvent = await client.events.create('endUserAccountId', 'calendarId', {
  title: 'Product Launch',
  description: 'Launch event for new product',
  start: {
    dateTime: '2026-02-15T14:00:00Z',
    timeZone: 'UTC'
  },
  end: {
    dateTime: '2026-02-15T16:00:00Z',
    timeZone: 'UTC'
  },
  location: '123 Main St, San Francisco, CA',
  attendees: [
    { email: 'alice@example.com', name: 'Alice' },
    { email: 'bob@example.com', name: 'Bob' }
  ],
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'email', minutes: 24 * 60 }, // 1 day before
      { method: 'popup', minutes: 30 }        // 30 minutes before
    ]
  }
});

// Update an event
const updated = await client.events.update('endUserAccountId', 'calendarId', 'eventId', {
  title: 'Updated Event Title',
  location: 'New Location'
});

// Delete an event
await client.events.delete('endUserAccountId', 'calendarId', 'eventId');

// Get recurring event occurrences
const occurrences = await client.events.getOccurrences(
  'endUserAccountId',
  'calendarId',
  'recurringEventId',
  {
    startDateTime: new Date('2026-01-01'),
    endDateTime: new Date('2026-03-31')
  }
);

// RSVP to an event
await client.events.rsvp('endUserAccountId', 'calendarId', 'eventId', {
  responseStatus: 'accepted'
});
```

### Free/Busy

Query free/busy availability across calendars.

```typescript
const freeBusy = await client.freeBusy.get('endUserAccountId', {
  startDateTime: new Date(),
  endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next 7 days
  timeZone: 'America/New_York',
  calendarIds: ['calendar1', 'calendar2']
});

// Response is an array of FreeBusySlot objects
console.log('Free/Busy results:', freeBusy);
// Example: [{ calendarId: 'calendar1', busySlots: [{ start: {...}, end: {...} }] }]
```

### Calendar Subscriptions

Subscribe to calendar event notifications via webhooks.

```typescript
// List subscriptions
const subscriptions = await client.calendarSubscriptions.list('endUserAccountId');

// Create a subscription for calendar events
const subscription = await client.calendarSubscriptions.create('endUserAccountId', {
  webhookUrl: 'https://your-app.com/webhooks',
  calendarId: 'calendarId',
  subscriptionType: 'event', // 'event' for calendar events, 'calendar' for calendar changes
  rateLimit: 100 // Optional: requests per second limit
});
// Returns: { webhookSubscriptionId: string, endpointSecret: string }

// Create a subscription for calendar list changes
const calendarSub = await client.calendarSubscriptions.create('endUserAccountId', {
  webhookUrl: 'https://your-app.com/webhooks/calendars',
  subscriptionType: 'calendar',
});

// Delete a subscription
await client.calendarSubscriptions.delete('endUserAccountId', 'subscriptionId');
```

### OAuth

Generate OAuth authorization URLs for connecting user calendars.

```typescript
import { getOAuthUrl } from '@onecal/unified-calendar-api-node-sdk/oauth';

// Get OAuth URL for Google
const googleUrl = getOAuthUrl('your-app-id', 'GOOGLE', {
  redirectUrl: 'https://your-app.com/callback',
  externalId: 'user-123',
  loginHint: 'user@example.com',
  unifiedApiBaseUrl: 'https://api.onecalunified.com' // Optional: defaults to production
});

// Get OAuth URL for Microsoft
const microsoftUrl = getOAuthUrl('your-app-id', 'MICROSOFT', {
  redirectUrl: 'https://your-app.com/callback',
  externalId: 'user-456'
});

// Redirect user to the OAuth URL
// After authorization, they'll be redirected back to your redirectUrl
```

## Error Handling

The SDK provides specific error types for different scenarios:

```typescript
import {
  UnifiedCalendarApiError,
  APIRequestError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  RateLimitError
} from '@onecal/unified-calendar-api-node-sdk';

try {
  const event = await client.events.get('accountId', 'calendarId', 'eventId');
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key');
  } else if (error instanceof NotFoundError) {
    console.error('Event not found');
  } else if (error instanceof RateLimitError) {
    console.error(`Rate limited. Retry after ${error.retryAfter} seconds`);
  } else if (error instanceof APIRequestError) {
    console.error(`API error: ${error.message} (${error.status})`);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## TypeScript Support

This SDK is written in TypeScript and provides comprehensive type definitions:

```typescript
import type {
  Calendar,
  Event,
  EndUserAccount,
  CreateEventInput,
  ListEventsParams,
  EventOrderBy,
  ProviderType
} from '@onecal/unified-calendar-api-node-sdk';
```

## Examples

See the [`examples/`](./examples/) directory for more usage examples:

- [`quickstart.ts`](./examples/quickstart.ts) - Complete quick start guide

## Development

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Run tests
npm test

# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run typecheck

# Watch mode (for development)
npm run dev
```

## Support

- 📧 Email: contact@onecalunified.com
- 📚 Documentation: https://docs.onecalunified.com

## Links

- [OneCal Unified API Website](https://www.onecal.io/unified-calendar-api)
- [API Documentation](https://docs.onecalunified.com)
- [NPM Package](https://www.npmjs.com/package/@onecal/unified-calendar-api-node-sdk)
- [GitHub Repository](https://github.com/onecal-unified/unified-calendar-api-node-sdk)
