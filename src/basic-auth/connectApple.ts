/**
 * Apple iCloud basic auth connection utility
 */

/**
 * Get the API URL for connecting an Apple iCloud account via basic auth.
 * Use this URL to POST the user's Apple ID email and app-specific password.
 *
 * @param appId - Your OneCal application ID
 * @param options - Optional configuration
 * @returns The API endpoint URL for connecting an Apple account
 *
 * @example
 * ```typescript
 * import { getConnectAppleUrl } from '@onecal/unified-calendar-api-node-sdk/basic-auth';
 *
 * const url = getConnectAppleUrl('your-app-id');
 * // POST to this URL with { email, password, externalId? }
 * ```
 */
export function getConnectAppleUrl(
  appId: string,
  options?: {
    unifiedApiBaseUrl?: string;
  }
): string {
  const baseUrl =
    options?.unifiedApiBaseUrl || 'https://api.onecalunified.com';
  return `${baseUrl}/api/v1/basicAuth/connect/${appId}/apple`;
}
