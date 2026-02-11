/**
 * End User Account types
 */

export enum ProviderType {
  GOOGLE = 'GOOGLE',
  MICROSOFT = 'MICROSOFT',
  APPLE = 'APPLE',
}

export enum EndUserAccountCredentialStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

export interface EndUserAccount {
  /** Unique identifier for the end user account */
  id: string;

  /** Email address of the end user */
  email: string;

  /** Custom ID for the end user account if provided */
  externalId?: string | null;

  /** The ID of the account in the provider's system, if applicable */
  providerAccountId?: string | null;

  /** Type of the provider associated with this end user account */
  providerType: ProviderType;

  /** Identifier of the application associated with this end user account */
  applicationId: string;

  /** List of authorized scopes granted by the end user account to the application */
  authorizedScopes?: string[];

  /** Status of the end user account */
  status: EndUserAccountCredentialStatus;

  /** Timestamp of when the end user account was created */
  createdAt: string;

  /** Timestamp of when the end user account was last updated */
  updatedAt: string;
}

export interface EndUserAccountCredential {
  /** Unique identifier for the credential */
  id: string;

  /** ID of the end user account this credential belongs to */
  endUserAccountId: string;

  /** OAuth access token for API calls */
  accessToken: string;

  /** OAuth refresh token for obtaining new access tokens (null if not available) */
  refreshToken: string | null;

  /** Current status of the credential */
  status: EndUserAccountCredentialStatus;

  /** Expiration timestamp for the access token in ISO 8601 format (optional) */
  expiresAt?: string | null;

  /** Timestamp when the credential was created in ISO 8601 format */
  createdAt: string;

  /** Timestamp when the credential was last updated in ISO 8601 format */
  updatedAt: string;
}

export interface UpsertEndUserAccountInput {
  /** Email address of the end user */
  email: string;

  /** OAuth refresh token obtained from the authorization flow */
  refreshToken: string;

  /** Type of the provider (GOOGLE, MICROSOFT, or APPLE) */
  providerType: ProviderType;

  /** Custom ID for the end user account if provided */
  externalId?: string;

  /** List of OAuth scopes that were authorized (optional) */
  authorizedScopes?: string[];
}

export interface ListEndUserAccountsParams {
  /** Pagination token for retrieving the next page of results */
  pageToken?: string;

  /** Maximum number of accounts to return per page */
  limit?: number;

  /** Filter end user accounts by email or external ID */
  search?: string;

  /** Filter end user accounts by status. If not provided, all EUAs matching the search parameter will be returned, regardless of status */
  statusFilter?: 'active' | 'expired';
}

export interface ListEndUserAccountsResponse {
  /** Array of end user accounts */
  data: EndUserAccount[];

  /** Token for retrieving the next page of results */
  nextPageToken?: string;
}
