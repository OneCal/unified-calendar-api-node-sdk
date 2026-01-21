/**
 * Tests for Unified Calendar API main client
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { UnifiedCalendarApi } from '../../src/client/UnifiedCalendarApi';

describe('UnifiedCalendarApi', () => {
  let client: UnifiedCalendarApi;

  beforeEach(() => {
    client = new UnifiedCalendarApi({ apiKey: 'test-api-key' });
  });

  describe('constructor', () => {
    it('should initialize all resource clients', () => {
      expect(client.calendars).toBeDefined();
      expect(client.events).toBeDefined();
      expect(client.endUserAccounts).toBeDefined();
      expect(client.freeBusy).toBeDefined();
      expect(client.calendarSubscriptions).toBeDefined();
    });
  });
});
