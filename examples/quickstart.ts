/**
 * Quick Start Example for Unified Calendar API SDK
 */

import { config } from 'dotenv';
import { UnifiedCalendarApi, EventOrderBy, getOAuthUrl } from '../src';

config();

async function main() {
  if (!process.env.UNIFIED_API_KEY) {
    console.error('UNIFIED_API_KEY environment variable is not set');
    process.exit(1);
  }

  // Initialize the client
  const client = new UnifiedCalendarApi({
    apiKey: process.env.UNIFIED_API_KEY,
    unifiedApiBaseUrl: process.env.UNIFIED_API_BASE_URL,
  });

  try {
    // Example: List all end user accounts
    console.log('\nListing end user accounts...');
    const accounts = await client.endUserAccounts.list({ limit: 10 });
    console.log(`Found ${accounts.data.length} accounts`);

    if (accounts.data.length > 0) {
      const firstAccount = accounts.data[0];
      console.log(`\nFirst account: ${firstAccount.email} (${firstAccount.id})`);

      // Example: List calendars for the first account
      console.log('\nListing calendars...');
      const calendars = await client.calendars.list(firstAccount.id);
      console.log(`Found ${calendars.data?.length || 0} calendars`);

      if (calendars.data && calendars.data.length > 0) {
        const firstCalendar = calendars.data[0];
        console.log(`First calendar: ${firstCalendar.name} (${firstCalendar.id})`);

        // Example: List events in the first calendar
        console.log('\nListing events...');
        const events = await client.events.list(
          firstAccount.id,
          firstCalendar.id,
          {
            pageSize: 5,
            startDateTime: new Date(),
            orderBy: EventOrderBy.START_TIME,
          }
        );
        console.log(`Found ${events.data?.length || 0} events`);

        if (events.data && events.data.length > 0) {
          events.data.forEach((event) => {
            console.log(`  - ${event.title} (${event.start.dateTime})`);
          });
        }

        // Example: Create a new event
        console.log('\nCreating a new event...');
        const newEvent = await client.events.create(
          firstAccount.id,
          firstCalendar.id,
          {
            title: 'SDK Test Event',
            description: 'Created via OneCal Node.js SDK',
            start: {
              dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
              timeZone: 'UTC',
            },
            end: {
              dateTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
              timeZone: 'UTC',
            },
            attendees: [
              {
                email: 'attendee@example.com',
                name: 'Test Attendee',
              },
            ],
          }
        );
        console.log(`Created event: ${newEvent.title} (${newEvent.id})`);

        // Example: Get free/busy information
        console.log('\nGetting free/busy info...');
        const freeBusy = await client.freeBusy.get(firstAccount.id, {
          startDateTime: new Date(),
          endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next 7 days
          timeZone: 'UTC',
          calendarIds: [firstCalendar.id],
        });
        console.log('Free/busy data:', JSON.stringify(freeBusy, null, 2));
      }
    }

    // Example: Get OAuth URL
    console.log('\nOAuth URL for Google:');
    const oauthUrl = getOAuthUrl('your-app-id', 'GOOGLE', {
      redirectUrl: 'https://your-app.com/callback',
      externalId: 'user-123',
    });
    console.log(oauthUrl);

  } catch (error: any) {
    console.error('\nError:', error.message);
    if (error.status) {
      console.error(`Status: ${error.status}`);
    }
    if (error.details) {
      console.error('Details:', error.details);
    }
  }
}

// Run the example
main();
