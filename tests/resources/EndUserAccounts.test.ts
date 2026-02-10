/**
 * Tests for EndUserAccounts resource
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EndUserAccounts } from '../../src/resources/EndUserAccounts';
import { BaseClient } from '../../src/client/BaseClient';
import { ProviderType } from '../../src/types';

describe('EndUserAccounts', () => {
  let endUserAccounts: EndUserAccounts;
  let mockClient: any;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
      buildUrl: vi.fn((path, params) => {
        if (!params) return path;
        const query = new URLSearchParams(params).toString();
        return `${path}?${query}`;
      }),
    };
    endUserAccounts = new EndUserAccounts(mockClient as BaseClient);
  });

  describe('list', () => {
    it('should list all end user accounts', async () => {
      const mockResponse = {
        data: [
          { id: 'acc1', email: 'user1@example.com' },
          { id: 'acc2', email: 'user2@example.com' },
        ],
        nextPageToken: 'token123',
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await endUserAccounts.list();

      expect(mockClient.buildUrl).toHaveBeenCalledWith(
        '/api/v1/endUserAccounts',
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it('should list accounts with filters', async () => {
      const mockResponse = { data: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      await endUserAccounts.list({
        limit: 20,
        search: 'user@example.com',
        statusFilter: 'active',
      });

      expect(mockClient.buildUrl).toHaveBeenCalledWith(
        '/api/v1/endUserAccounts',
        {
          limit: 20,
          search: 'user@example.com',
          statusFilter: 'active',
        }
      );
    });
  });

  describe('get', () => {
    it('should get a specific account', async () => {
      const mockAccount = {
        id: 'acc1',
        email: 'user@example.com',
        providerType: ProviderType.GOOGLE,
      };
      mockClient.get.mockResolvedValue(mockAccount);

      const result = await endUserAccounts.get('acc1');

      expect(mockClient.get).toHaveBeenCalledWith(
        '/api/v1/endUserAccounts/acc1'
      );
      expect(result).toEqual(mockAccount);
    });
  });

  describe('create', () => {
    it('should create a new end user account', async () => {
      const newAccount = {
        email: 'newuser@example.com',
        refreshToken: 'refresh-token-123',
        providerType: ProviderType.GOOGLE,
        externalId: 'ext123',
      };
      const mockResponse = { id: 'acc1', ...newAccount };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await endUserAccounts.upsert(newAccount);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/api/v1/endUserAccounts',
        newAccount
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should delete an end user account', async () => {
      const mockResponse = { success: true };
      mockClient.delete.mockResolvedValue(mockResponse);

      const result = await endUserAccounts.delete('acc1');

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/api/v1/endUserAccounts/acc1'
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCredentials', () => {
    it('should get account credentials', async () => {
      const mockCredentials = {
        id: 'cred1',
        endUserAccountId: 'acc1',
        status: 'ACTIVE',
        expiresAt: '2026-12-31T23:59:59Z',
      };
      mockClient.get.mockResolvedValue(mockCredentials);

      const result = await endUserAccounts.getCredentials('acc1');

      expect(mockClient.get).toHaveBeenCalledWith(
        '/api/v1/endUserAccounts/acc1/credentials'
      );
      expect(result).toEqual(mockCredentials);
    });
  });
});
