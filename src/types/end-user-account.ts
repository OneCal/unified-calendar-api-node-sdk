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
  id: string;
  email: string;
  externalId?: string | null;
  providerAccountId?: string | null;
  providerType: ProviderType;
  applicationId: string;
  authorizedScopes?: string[];
  status: EndUserAccountCredentialStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EndUserAccountCredential {
  id: string;
  endUserAccountId: string;
  accessToken: string;
  refreshToken: string | null;
  status: EndUserAccountCredentialStatus;
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEndUserAccountInput {
  email: string;
  refreshToken: string;
  providerType: ProviderType;
  externalId?: string;
  authorizedScopes?: string[];
}

export interface ListEndUserAccountsParams {
  pageToken?: string;
  limit?: number;
  search?: string;
  statusFilter?: 'active' | 'expired';
}

export interface ListEndUserAccountsResponse {
  data: EndUserAccount[];
  nextPageToken?: string;
}
