/**
 * Tests for FreeBusy resource
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FreeBusy } from '../../src/resources/FreeBusy';
import { BaseClient } from '../../src/client/BaseClient';

describe('FreeBusy', () => {
  let freeBusy: FreeBusy;
  let mockClient: any;

  beforeEach(() => {
    mockClient = {
      post: vi.fn(),
    };
    freeBusy = new FreeBusy(mockClient as BaseClient);
  });

  describe('get', () => {
    it('should get free/busy information with Date objects', async () => {
      const startDate = new Date('2026-01-22T00:00:00Z');
      const endDate = new Date('2026-01-29T00:00:00Z');

      const mockResponse = [
        {
          calendarId: 'cal1',
          busySlots: [
            {
              start: {
                dateTime: '2026-01-23T10:00:00Z',
                timeZone: 'UTC',
              },
              end: {
                dateTime: '2026-01-23T11:00:00Z',
                timeZone: 'UTC',
              },
            },
          ],
        },
      ];
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await freeBusy.get('account123', {
        startDateTime: startDate,
        endDateTime: endDate,
        timeZone: 'UTC',
        calendarIds: ['cal1'],
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/freeBusy/account123',
        {
          startDateTime: startDate,
          endDateTime: endDate,
          timeZone: 'UTC',
          calendarIds: ['cal1'],
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get free/busy information with ISO string dates', async () => {
      const startDateTime = '2026-01-22T00:00:00Z';
      const endDateTime = '2026-01-29T00:00:00Z';

      const mockResponse = [
        {
          calendarId: 'cal1',
          busySlots: [],
        },
      ];
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await freeBusy.get('account123', {
        startDateTime,
        endDateTime,
        timeZone: 'America/New_York',
        calendarIds: ['cal1'],
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/freeBusy/account123',
        {
          startDateTime,
          endDateTime,
          timeZone: 'America/New_York',
          calendarIds: ['cal1'],
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get free/busy for multiple calendars', async () => {
      const mockResponse = [
        {
          calendarId: 'cal1',
          busySlots: [
            {
              start: {
                dateTime: '2026-01-23T10:00:00Z',
                timeZone: 'UTC',
              },
              end: {
                dateTime: '2026-01-23T11:00:00Z',
                timeZone: 'UTC',
              },
            },
          ],
        },
        {
          calendarId: 'cal2',
          busySlots: [
            {
              start: {
                dateTime: '2026-01-23T14:00:00Z',
                timeZone: 'UTC',
              },
              end: {
                dateTime: '2026-01-23T15:00:00Z',
                timeZone: 'UTC',
              },
            },
          ],
        },
      ];
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await freeBusy.get('account123', {
        startDateTime: new Date('2026-01-22T00:00:00Z'),
        endDateTime: new Date('2026-01-29T00:00:00Z'),
        timeZone: 'UTC',
        calendarIds: ['cal1', 'cal2'],
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/freeBusy/account123',
        expect.objectContaining({
          calendarIds: ['cal1', 'cal2'],
        })
      );
      expect(result).toEqual(mockResponse);
      expect(result).toHaveLength(2);
    });

    it('should handle empty busy slots', async () => {
      const mockResponse = [
        {
          calendarId: 'cal1',
          busySlots: [],
        },
      ];
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await freeBusy.get('account123', {
        startDateTime: new Date(),
        endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        timeZone: 'UTC',
        calendarIds: ['cal1'],
      });

      expect(result[0].busySlots).toEqual([]);
    });

    it('should handle multiple busy slots for a single calendar', async () => {
      const mockResponse = [
        {
          calendarId: 'cal1',
          busySlots: [
            {
              start: {
                dateTime: '2026-01-23T09:00:00Z',
                timeZone: 'UTC',
              },
              end: {
                dateTime: '2026-01-23T10:00:00Z',
                timeZone: 'UTC',
              },
            },
            {
              start: {
                dateTime: '2026-01-23T14:00:00Z',
                timeZone: 'UTC',
              },
              end: {
                dateTime: '2026-01-23T15:00:00Z',
                timeZone: 'UTC',
              },
            },
            {
              start: {
                dateTime: '2026-01-24T10:00:00Z',
                timeZone: 'UTC',
              },
              end: {
                dateTime: '2026-01-24T11:30:00Z',
                timeZone: 'UTC',
              },
            },
          ],
        },
      ];
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await freeBusy.get('account123', {
        startDateTime: new Date('2026-01-23T00:00:00Z'),
        endDateTime: new Date('2026-01-25T00:00:00Z'),
        timeZone: 'UTC',
        calendarIds: ['cal1'],
      });

      expect(result[0].busySlots).toHaveLength(3);
    });

    it('should handle different timezones', async () => {
      const mockResponse = [
        {
          calendarId: 'cal1',
          busySlots: [
            {
              start: {
                dateTime: '2026-01-23T10:00:00-05:00',
                timeZone: 'America/New_York',
              },
              end: {
                dateTime: '2026-01-23T11:00:00-05:00',
                timeZone: 'America/New_York',
              },
            },
          ],
        },
      ];
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await freeBusy.get('account123', {
        startDateTime: new Date('2026-01-22T00:00:00Z'),
        endDateTime: new Date('2026-01-29T00:00:00Z'),
        timeZone: 'America/New_York',
        calendarIds: ['cal1'],
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/freeBusy/account123',
        expect.objectContaining({
          timeZone: 'America/New_York',
        })
      );
      expect(result[0].busySlots?.[0].start?.timeZone).toBe('America/New_York');
    });
  });
});
