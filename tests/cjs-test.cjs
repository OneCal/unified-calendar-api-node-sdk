/**
 * Test script to verify CJS imports work correctly
 */

const { UnifiedCalendarApi, getOAuthUrl } = require('../dist/index.cjs');

console.log('CJS Import Test');
console.log('UnifiedCalendarApi:', typeof UnifiedCalendarApi);
console.log('getOAuthUrl:', typeof getOAuthUrl);

const { getOAuthUrl: getOAuthUrl2 } = require('../dist/oauth/index.cjs');
console.log('getOAuthUrl (from oauth subpath):', typeof getOAuthUrl2);

console.log('\nAll CJS imports successful!');
