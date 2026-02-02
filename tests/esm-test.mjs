/**
 * Test script to verify ESM imports work correctly
 */

import { UnifiedCalendarApi, getOAuthUrl } from '../dist/index.js';

console.log('ESM Import Test');
console.log('UnifiedCalendarApi:', typeof UnifiedCalendarApi);
console.log('getOAuthUrl:', typeof getOAuthUrl);

import { getOAuthUrl as getOAuthUrl2 } from '../dist/oauth/index.js';
console.log('getOAuthUrl (from oauth subpath):', typeof getOAuthUrl2);

console.log('\nAll ESM imports successful!');
