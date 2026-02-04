/**
 * Tests for Events resource
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Events } from '../../src/resources/Events';
import { BaseClient } from '../../src/client/BaseClient';
import { EventOrderBy } from '../../src/types';

describe('Events', () => {
  let events: Events;
  let mockClient: any;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      buildUrl: vi.fn((path, params) => {
        if (!params) return path;
        const query = new URLSearchParams(params).toString();
        return `${path}?${query}`;
      }),
    };
    events = new Events(mockClient as BaseClient);
  });

  describe('list', () => {
    it('should list events', async () => {
      const mockResponse = {
        data: [
          { id: 'evt1', title: 'Event 1' },
          { id: 'evt2', title: 'Event 2' },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await events.list('account123', 'cal123');

      expect(mockClient.buildUrl).toHaveBeenCalledWith(
        '/api/v1/events/account123/cal123',
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it('should list events with filters', async () => {
      const mockResponse = { data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const filters = {
        startDateTime: new Date('2026-01-01'),
        endDateTime: new Date('2026-12-31'),
        search: 'meeting',
        orderBy: EventOrderBy.START_TIME,
        pageSize: 50,
      };

      await events.list('account123', 'cal123', filters);

      expect(mockClient.buildUrl).toHaveBeenCalledWith(
        '/api/v1/events/account123/cal123',
        filters
      );
    });
  });

  describe('get', () => {
    it('should get a specific event', async () => {
      const mockEvent = {
        id: 'evt1',
        title: 'Team Meeting',
        start: { dateTime: '2026-01-20T10:00:00Z' },
        end: { dateTime: '2026-01-20T11:00:00Z' },
      };
      mockClient.get.mockResolvedValue(mockEvent);

      const result = await events.get('account123', 'cal123', 'evt1');

      expect(mockClient.get).toHaveBeenCalledWith(
        '/api/v1/events/account123/cal123/evt1'
      );
      expect(result).toEqual(mockEvent);
    });
  });

  describe('create', () => {
    it('should create a new event', async () => {
      const newEvent = {
        title: 'New Meeting',
        start: { dateTime: '2026-01-20T10:00:00Z', timeZone: 'UTC' },
        end: { dateTime: '2026-01-20T11:00:00Z', timeZone: 'UTC' },
        attendees: [{ email: 'test@example.com' }],
      };
      const mockResponse = { id: 'evt1', ...newEvent };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await events.create('account123', 'cal123', newEvent);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/events/account123/cal123',
        newEvent
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updateData = { title: 'Updated Meeting' };
      const mockResponse = { id: 'evt1', ...updateData };
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await events.update('account123', 'cal123', 'evt1', updateData);

      expect(mockClient.put).toHaveBeenCalledWith(
        '/api/v1/events/account123/cal123/evt1',
        updateData
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should delete an event', async () => {
      const mockResponse = { success: true };
      mockClient.delete.mockResolvedValue(mockResponse);

      const result = await events.delete('account123', 'cal123', 'evt1');

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/api/v1/events/account123/cal123/evt1'
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getOccurrences', () => {
    it('should get recurring event occurrences', async () => {
      const mockResponse = {
        data: [
          { id: 'evt1-1', title: 'Event Instance 1' },
          { id: 'evt1-2', title: 'Event Instance 2' },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const params = {
        startDateTime: new Date('2026-01-01'),
        endDateTime: new Date('2026-03-31'),
      };

      const result = await events.getOccurrences(
        'account123',
        'cal123',
        'evt1',
        params
      );

      expect(mockClient.buildUrl).toHaveBeenCalledWith(
        '/api/v1/events/account123/cal123/evt1/occurrences',
        params
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('rsvp', () => {
    it('should RSVP to an event', async () => {
      const rsvpData = {
        responseStatus: 'accepted' as const,
      };
      const mockResponse = { success: true };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await events.rsvp('account123', 'cal123', 'evt1', rsvpData);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/events/account123/cal123/evt1/rsvp',
        rsvpData
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
