/**
 * Tests for BasicAuth resource
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BasicAuth } from '../../src/resources/BasicAuth';
import { BaseClient } from '../../src/client/BaseClient';
import { ProviderType } from '../../src/types';

describe('BasicAuth', () => {
  let basicAuth: BasicAuth;
  let mockClient: any;

  beforeEach(() => {
    mockClient = { post: vi.fn() };
    basicAuth = new BasicAuth(mockClient as BaseClient);
  });

  it('should connect an Apple account', async () => {
    const data = { email: 'user@icloud.com', password: 'xxxx-xxxx-xxxx-xxxx' };
    mockClient.post.mockResolvedValue({ id: 'acc1', providerType: ProviderType.APPLE });

    await basicAuth.connect('app1', 'apple', data);

    expect(mockClient.post).toHaveBeenCalledWith(
      '/api/v1/basicAuth/connect/app1/apple',
      data
    );
  });

  it('should connect a CalDAV account with its server URL', async () => {
    const data = {
      serverUrl: 'https://caldav.fastmail.com',
      email: 'user@fastmail.com',
      password: 'app-password',
    };
    const account = {
      id: 'acc2',
      providerType: ProviderType.CALDAV,
      serverUrl: 'https://caldav.fastmail.com/',
    };
    mockClient.post.mockResolvedValue(account);

    const result = await basicAuth.connect('app1', 'caldav', data);

    expect(mockClient.post).toHaveBeenCalledWith(
      '/api/v1/basicAuth/connect/app1/caldav',
      data
    );
    expect(result).toEqual(account);
  });
});
