/**
 * Tests for OneCal main client
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OneCal } from '../../src/client/OneCal';

describe('OneCal', () => {
  let client: OneCal;

  beforeEach(() => {
    client = new OneCal({ apiKey: 'test-api-key' });
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

  describe('getOAuthUrl', () => {
    it('should generate Google OAuth URL', () => {
      const url = client.getOAuthUrl('app123', 'GOOGLE');
      expect(url).toBe('https://api.onecalunified.com/api/v1/oauth/authorize/app123/google');
    });

    it('should generate Microsoft OAuth URL', () => {
      const url = client.getOAuthUrl('app123', 'MICROSOFT');
      expect(url).toBe(
        'https://api.onecalunified.com/api/v1/oauth/authorize/app123/microsoft'
      );
    });

    it('should include redirectUrl parameter', () => {
      const url = client.getOAuthUrl('app123', 'GOOGLE', {
        redirectUrl: 'https://myapp.com/callback',
      });
      expect(url).toContain('redirectUrl=https%3A%2F%2Fmyapp.com%2Fcallback');
    });

    it('should include externalId parameter', () => {
      const url = client.getOAuthUrl('app123', 'GOOGLE', {
        externalId: 'user-456',
      });
      expect(url).toContain('externalId=user-456');
    });

    it('should include loginHint parameter', () => {
      const url = client.getOAuthUrl('app123', 'GOOGLE', {
        loginHint: 'user@example.com',
      });
      expect(url).toContain('loginHint=user%40example.com');
    });

    it('should include prompt parameter', () => {
      const url = client.getOAuthUrl('app123', 'GOOGLE', {
        prompt: 'consent',
      });
      expect(url).toContain('prompt=consent');
    });

    it('should include state parameter', () => {
      const url = client.getOAuthUrl('app123', 'GOOGLE', {
        state: 'random-state-123',
      });
      expect(url).toContain('state=random-state-123');
    });

    it('should include multiple parameters', () => {
      const url = client.getOAuthUrl('app123', 'GOOGLE', {
        redirectUrl: 'https://myapp.com/callback',
        externalId: 'user-456',
        loginHint: 'user@example.com',
      });
      expect(url).toContain('redirectUrl=');
      expect(url).toContain('externalId=');
      expect(url).toContain('loginHint=');
    });

    it('should use custom baseURL if provided', () => {
      const customClient = new OneCal({
        apiKey: 'test-key',
        baseURL: 'https://custom.api.com',
      });
      const url = customClient.getOAuthUrl('app123', 'GOOGLE');
      expect(url).toBe('https://custom.api.com/api/v1/oauth/authorize/app123/google');
    });
  });
});
