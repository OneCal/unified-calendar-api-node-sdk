/**
 * Tests for CalendarSubscriptions resource
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CalendarSubscriptions } from '../../src/resources/CalendarSubscriptions';
import { BaseClient } from '../../src/client/BaseClient';

describe('CalendarSubscriptions', () => {
  let calendarSubscriptions: CalendarSubscriptions;
  let mockClient: any;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
      buildUrl: vi.fn((path, params) => {
        if (!params) return path;
        const queryString = new URLSearchParams(
          Object.entries(params).map(([k, v]): [string, string] => [
            k,
            String(v),
          ])
        ).toString();
        return `${path}?${queryString}`;
      }),
    };
    calendarSubscriptions = new CalendarSubscriptions(mockClient as BaseClient);
  });

  describe('list', () => {
    it('should list calendar subscriptions without params', async () => {
      const mockResponse = {
        data: [
          {
            id: 'sub1',
            endUserAccountId: 'account123',
            calendarId: 'cal1',
            url: 'https://example.com/webhook',
            provider: 'GOOGLE',
            subscriptionId: 'google-sub-123',
            resourceId: 'resource-123',
            createdAt: '2026-01-01T00:00:00Z',
            updatedAt: '2026-01-01T00:00:00Z',
          },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarSubscriptions.list('account123');

      expect(mockClient.buildUrl).toHaveBeenCalledWith(
        '/api/v1/calendarSubscriptions/account123',
        undefined
      );
      expect(mockClient.get).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
      expect(result.data).toHaveLength(1);
    });

    it('should list calendar subscriptions with pagination params', async () => {
      const mockResponse = {
        data: [
          {
            id: 'sub1',
            endUserAccountId: 'account123',
            calendarId: 'cal1',
            url: 'https://example.com/webhook',
            provider: 'MICROSOFT',
            createdAt: '2026-01-01T00:00:00Z',
            updatedAt: '2026-01-01T00:00:00Z',
          },
        ],
        nextPageToken: 'next-token',
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarSubscriptions.list('account123', {
        limit: 10,
        pageToken: 'token123',
      });

      expect(mockClient.buildUrl).toHaveBeenCalledWith(
        '/api/v1/calendarSubscriptions/account123',
        { limit: 10, pageToken: 'token123' }
      );
      expect(result).toEqual(mockResponse);
      expect(result.nextPageToken).toBe('next-token');
    });

    it('should handle empty subscription list', async () => {
      const mockResponse = {
        data: [],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarSubscriptions.list('account123');

      expect(result.data).toEqual([]);
      expect(result.data).toHaveLength(0);
    });

    it('should handle subscriptions with null optional fields', async () => {
      const mockResponse = {
        data: [
          {
            id: 'sub1',
            endUserAccountId: 'account123',
            calendarId: null,
            url: 'https://example.com/webhook',
            provider: 'GOOGLE',
            expiration: null,
            subscriptionId: null,
            resourceId: null,
            createdAt: '2026-01-01T00:00:00Z',
            updatedAt: '2026-01-01T00:00:00Z',
          },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarSubscriptions.list('account123');

      expect(result.data[0].calendarId).toBeNull();
      expect(result.data[0].expiration).toBeNull();
      expect(result.data[0].subscriptionId).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a calendar subscription with all fields', async () => {
      const input = {
        webhookUrl: 'https://example.com/webhook',
        calendarId: 'cal1',
        rateLimit: 100,
        subscriptionType: 'calendar' as const,
      };
      const mockResponse = {
        webhookSubscriptionId: 'sub-123',
        endpointSecret: 'secret-456',
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await calendarSubscriptions.create('account123', input);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/calendarSubscriptions/account123',
        input
      );
      expect(result).toEqual(mockResponse);
      expect(result.webhookSubscriptionId).toBe('sub-123');
      expect(result.endpointSecret).toBe('secret-456');
    });

    it('should create an event subscription', async () => {
      const input = {
        webhookUrl: 'https://example.com/webhook',
        calendarId: 'cal1',
        subscriptionType: 'event' as const,
      };
      const mockResponse = {
        webhookSubscriptionId: 'sub-789',
        endpointSecret: 'secret-abc',
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await calendarSubscriptions.create('account123', input);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/calendarSubscriptions/account123',
        input
      );
      expect(result).toEqual(mockResponse);
    });

    it('should create a subscription without optional fields', async () => {
      const input = {
        webhookUrl: 'https://example.com/webhook',
        subscriptionType: 'calendar' as const,
      };
      const mockResponse = {
        webhookSubscriptionId: 'sub-xyz',
        endpointSecret: 'secret-def',
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await calendarSubscriptions.create('account123', input);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/calendarSubscriptions/account123',
        input
      );
      expect(result).toEqual(mockResponse);
    });

    it('should create a subscription with custom rate limit', async () => {
      const input = {
        webhookUrl: 'https://example.com/webhook',
        calendarId: 'cal1',
        rateLimit: 50,
        subscriptionType: 'event' as const,
      };
      const mockResponse = {
        webhookSubscriptionId: 'sub-limit',
        endpointSecret: 'secret-limit',
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await calendarSubscriptions.create('account123', input);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/calendarSubscriptions/account123',
        expect.objectContaining({ rateLimit: 50 })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should delete a calendar subscription', async () => {
      const mockResponse = { success: true };
      mockClient.delete.mockResolvedValue(mockResponse);

      const result = await calendarSubscriptions.delete('account123', 'sub1');

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/api/v1/calendarSubscriptions/account123',
        { data: { subscriptionId: 'sub1' } }
      );
      expect(result).toEqual(mockResponse);
      expect(result.success).toBe(true);
    });

    it('should handle successful deletion', async () => {
      const mockResponse = { success: true };
      mockClient.delete.mockResolvedValue(mockResponse);

      const result = await calendarSubscriptions.delete(
        'account123',
        'subscription-to-delete'
      );

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/api/v1/calendarSubscriptions/account123',
        { data: { subscriptionId: 'subscription-to-delete' } }
      );
      expect(result.success).toBe(true);
    });

    it('should delete subscription with different account IDs', async () => {
      const mockResponse = { success: true };
      mockClient.delete.mockResolvedValue(mockResponse);

      await calendarSubscriptions.delete('different-account', 'sub1');

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/api/v1/calendarSubscriptions/different-account',
        { data: { subscriptionId: 'sub1' } }
      );
    });
  });
});
