/**
 * OAuth types
 */

import { ProviderType } from './end-user-account';

export interface OAuthAuthorizeParams {
  redirectUrl?: string;
  externalId?: string;
  loginHint?: string;
  prompt?: string;
  state?: string;
}

export interface OAuthAuthorizeUrlOptions {
  appId: string;
  provider: ProviderType;
  params?: OAuthAuthorizeParams;
}
