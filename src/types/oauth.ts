/**
 * OAuth types
 */

import { ProviderType } from './end-user-account';

export interface OAuthAuthorizeParams {
  /** URL to redirect to after authorization completes */
  redirectUrl?: string;
  
  /** External identifier from your system to associate with this authorization */
  externalId?: string;
  
  /** Email hint to pre-fill the login form */
  loginHint?: string;
  
  /** OAuth prompt parameter */
  prompt?: string;
  
  /** State parameter */
  state?: string;
}

export interface OAuthAuthorizeUrlOptions {
  /** Your application ID */
  appId: string;
  
  /** Calendar provider to authorize with */
  provider: ProviderType;
  
  /** Additional OAuth parameters */
  params?: OAuthAuthorizeParams;
}
