/**
 * Unified Calendar API - Node.js SDK
 *
 * Official TypeScript/JavaScript client for the Unified Calendar API
 *
 * @packageDocumentation
 */

// Main client
export { UnifiedCalendarApi } from './client/UnifiedCalendarApi';

// Export all types
export * from './types';

// Export errors
export * from './utils/errors';

// Export OAuth utilities
export * from './oauth';

// Export basic auth utilities
export * from './basic-auth';

// Export resource classes for advanced usage
export { Calendars } from './resources/Calendars';
export { Events } from './resources/Events';
export { EndUserAccounts } from './resources/EndUserAccounts';
export { FreeBusy } from './resources/FreeBusy';
export { CalendarSubscriptions } from './resources/CalendarSubscriptions';
