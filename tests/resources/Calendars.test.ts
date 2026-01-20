/**
 * Tests for Calendars resource
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Calendars } from '../../src/resources/Calendars';
import { BaseClient } from '../../src/client/BaseClient';

describe('Calendars', () => {
  let calendars: Calendars;
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
    calendars = new Calendars(mockClient as BaseClient);
  });

  describe('list', () => {
    it('should list calendars for an account', async () => {
      const mockResponse = {
        data: [
          { id: 'cal1', name: 'Calendar 1' },
          { id: 'cal2', name: 'Calendar 2' },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendars.list('account123');

      expect(mockClient.buildUrl).toHaveBeenCalledWith(
        '/api/v1/calendars/account123',
        undefined
      );
      expect(mockClient.get).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it('should list calendars with pagination params', async () => {
      const mockResponse = { data: [], pageToken: 'next' };
      mockClient.get.mockResolvedValue(mockResponse);

      await calendars.list('account123', {
        pageSize: 20,
        pageToken: 'token123',
      });

      expect(mockClient.buildUrl).toHaveBeenCalledWith(
        '/api/v1/calendars/account123',
        { pageSize: 20, pageToken: 'token123' }
      );
    });
  });

  describe('get', () => {
    it('should get a specific calendar', async () => {
      const mockCalendar = { id: 'cal1', name: 'My Calendar' };
      mockClient.get.mockResolvedValue(mockCalendar);

      const result = await calendars.get('account123', 'cal1');

      expect(mockClient.get).toHaveBeenCalledWith(
        '/api/v1/calendars/account123/cal1'
      );
      expect(result).toEqual(mockCalendar);
    });
  });

  describe('create', () => {
    it('should create a new calendar', async () => {
      const newCalendar = {
        name: 'New Calendar',
        hexColor: '#FF5733',
        timeZone: 'America/New_York',
      };
      const mockResponse = { id: 'cal1', ...newCalendar };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await calendars.create('account123', newCalendar);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/calendars/account123',
        newCalendar
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should update a calendar', async () => {
      const updateData = { name: 'Updated Calendar' };
      const mockResponse = { id: 'cal1', ...updateData };
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await calendars.update('account123', 'cal1', updateData);

      expect(mockClient.put).toHaveBeenCalledWith(
        '/api/v1/calendars/account123/cal1',
        updateData
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should delete a calendar', async () => {
      const mockResponse = { success: true };
      mockClient.delete.mockResolvedValue(mockResponse);

      const result = await calendars.delete('account123', 'cal1');

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/api/v1/calendars/account123/cal1'
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
