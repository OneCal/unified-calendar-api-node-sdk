/**
 * Integration tests for the Unified Calendar API SDK
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { UnifiedCalendarApi, EventOrderBy } from '../../src';

describe.skip('UnifiedCalendarApi SDK Integration Tests', () => {
// describe('UnifiedCalendarApi SDK Integration Tests', () => {
  let client: UnifiedCalendarApi;
  let testAccountId: string;
  let testCalendarId: string;

  beforeAll(() => {
    const apiKey = process.env.UNIFIED_API_KEY;
    const baseURL = process.env.UNIFIED_API_BASE_URL;

    if (!apiKey) {
      throw new Error('UNIFIED_API_KEY environment variable is required');
    }
    
    client = new UnifiedCalendarApi({ 
      apiKey, 
      unifiedApiBaseUrl: baseURL || 'https://api.onecalunified.com',
    });
  });

  describe('End User Accounts', () => {
    it('should list end user accounts', async () => {
      const result = await client.endUserAccounts.list({ limit: 10 });
      expect(result).toHaveProperty('data');
      expect(Array.isArray(result.data)).toBe(true);
      
      if (result.data.length > 0) {
        testAccountId = result.data[0].id;
      }
    });

    it('should get a specific account', async () => {
      if (!testAccountId) return;
      
      const account = await client.endUserAccounts.get(testAccountId);
      expect(account).toHaveProperty('id', testAccountId);
      expect(account).toHaveProperty('email');
    });

    it('should get account credentials', async () => {
      if (!testAccountId) return;
      
      const credentials = await client.endUserAccounts.getCredentials(testAccountId);
      expect(credentials).toHaveProperty('endUserAccountId', testAccountId);
      expect(credentials).toHaveProperty('status');
    });
  });

  describe('Calendars', () => {
    it('should list calendars', async () => {
      if (!testAccountId) return;
      
      const result = await client.calendars.list(testAccountId);
      expect(result).toHaveProperty('data');
      expect(Array.isArray(result.data)).toBe(true);
      
      if (result.data && result.data.length > 0) {
        testCalendarId = result.data[0].id;
      }
    });

    it('should get a specific calendar', async () => {
      if (!testAccountId || !testCalendarId) return;
      
      const calendar = await client.calendars.get(testAccountId, testCalendarId);
      expect(calendar).toHaveProperty('id', testCalendarId);
      expect(calendar).toHaveProperty('name');
    });
  });

  describe('Events', () => {
    it('should list events', async () => {
      if (!testAccountId || !testCalendarId) return;
      
      const result = await client.events.list(testAccountId, testCalendarId, {
        pageSize: 10,
        orderBy: EventOrderBy.START_TIME,
      });
      expect(result).toHaveProperty('data');
      expect(Array.isArray(result.data)).toBe(true);
    });

    it('should create, update, and delete an event', async () => {
      if (!testAccountId || !testCalendarId) return;
      
      // Create
      const newEvent = await client.events.create(testAccountId, testCalendarId, {
        title: 'SDK Integration Test Event',
        description: 'Created by OneCal SDK integration test',
        start: {
          dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
          timeZone: 'UTC',
        },
      });
      expect(newEvent).toHaveProperty('id');
      expect(newEvent.title).toBe('SDK Integration Test Event');
      
      const eventId = newEvent.id;
      
      // Update
      const updatedEvent = await client.events.update(
        testAccountId,
        testCalendarId,
        eventId,
        { title: 'Updated SDK Test Event' }
      );
      expect(updatedEvent.title).toBe('Updated SDK Test Event');

      // Delete
      await client.events.delete(testAccountId, testCalendarId, eventId);
    });
  });

  describe('Free/Busy', () => {
    it('should get free/busy information', async () => {
      if (!testAccountId || !testCalendarId) return;
      
      const result = await client.freeBusy.get(testAccountId, {
        startDateTime: new Date(),
        endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        timeZone: 'UTC',
        calendarIds: [testCalendarId],
      });
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(0);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('calendarId');
        expect(result[0]).toHaveProperty('busySlots');
      }
    });
  });
});
