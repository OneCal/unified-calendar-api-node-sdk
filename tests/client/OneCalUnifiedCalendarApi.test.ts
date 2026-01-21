/**
 * Tests for OneCal main client
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { OneCalUnifiedCalendarApi } from '../../src/client/OneCalUnifiedCalendarApi';

describe('OneCal', () => {
  let client: OneCalUnifiedCalendarApi;

  beforeEach(() => {
    client = new OneCalUnifiedCalendarApi({ apiKey: 'test-api-key' });
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
