/**
 * OneCal Unified Calendar API - Node.js SDK
 * 
 * Official TypeScript/JavaScript client for the OneCal Unified Calendar API
 * 
 * @packageDocumentation
 */

// Main client
export { OneCal } from './client/OneCal';

// Export all types
export * from './types';

// Export errors
export * from './utils/errors';

// Export resource classes for advanced usage
export { Calendars } from './resources/Calendars';
export { Events } from './resources/Events';
export { EndUserAccounts } from './resources/EndUserAccounts';
export { FreeBusy } from './resources/FreeBusy';
export { CalendarSubscriptions } from './resources/CalendarSubscriptions';
