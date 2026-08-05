/**
 * OAuth utilities
 */

/**
 * Get OAuth authorization URL
 * @param appId - Your OneCal application ID
 * @param provider - The provider type (GOOGLE or MICROSOFT)
 * @param params - OAuth parameters
 * @returns The OAuth authorization URL
 *
 */
export function getOAuthUrl(
  appId: string,
  provider: 'GOOGLE' | 'MICROSOFT',
  params?: {
    redirectUrl?: string;
    externalId?: string;
    loginHint?: string;
    prompt?: string;
    state?: string;
    unifiedApiBaseUrl?: string;
  }
): string {
  const baseUrl = params?.unifiedApiBaseUrl || 'https://api.apiroc.com';
  const queryParams = new URLSearchParams();

  if (params?.redirectUrl)
    queryParams.append('redirectUrl', params.redirectUrl);
  if (params?.externalId) queryParams.append('externalId', params.externalId);
  if (params?.loginHint) queryParams.append('loginHint', params.loginHint);
  if (params?.prompt) queryParams.append('prompt', params.prompt);
  if (params?.state) queryParams.append('state', params.state);

  const queryString = queryParams.toString();
  const url = `${baseUrl}/api/v1/oauth/authorize/${appId}/${provider.toLowerCase()}`;

  return queryString ? `${url}?${queryString}` : url;
}
