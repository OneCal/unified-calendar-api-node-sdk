/**
 * Event types
 */

import { PaginationParams } from './common';

export enum EventColorId {
  LAVENDER = '1',
  SAGE = '2',
  GRAPE = '3',
  FLAMINGO = '4',
  BANANA = '5',
  TANGERINE = '6',
  PEACOCK = '7',
  GRAPHITE = '8',
  BLUEBERRY = '9',
  BASIL = '10',
  TOMATO = '11',
}

export enum EventOrderBy {
  START_TIME = 'startDateTime',
  UPDATED = 'updatedDateTime',
}

export interface EventDateTime {
  /** Date and time in ISO 8601 format (e.g., 2023-03-15T10:00:00) */
  dateTime?: string;

  /** Time zone identifier (e.g., America/New_York) */
  timeZone?: string;
}

export interface EventAttendee {
  /** Unique identifier of the attendee */
  id?: string;

  /** Full name of the attendee */
  name?: string;

  /** Email address of the attendee */
  email: string;

  /** The attendee's response to the invitation */
  responseStatus?: 'needsAction' | 'declined' | 'tentative' | 'accepted';
}

export interface EventActor {
  /** Unique identifier for the actor (optional) */
  id?: string;

  /** Display name of the actor (optional) */
  name?: string;

  /** Email address of the actor (optional) */
  email?: string;

  /** Whether this actor is the current user */
  isSelf?: boolean;
}

export interface ConferenceData {
  /** Conference identifier from the provider (optional) */
  conferenceId?: string;

  /** URL to join the conference */
  joinUrl?: string;

  /** Type of conference (e.g., hangoutsMeet, zoom, teams) */
  conferenceType?: string;

  /** Additional conference details specific to the provider */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conferenceDetails?: Record<string, any>;
}

export interface EventReminder {
  /** Reminder notification method (e.g., email, popup) */
  method?: string;

  /** Number of minutes before the event to trigger the reminder */
  minutes?: number;
}

export interface EventReminders {
  /** Whether to use the calendar's default reminder settings */
  useDefault?: boolean;

  /** Whether reminders are enabled for this event */
  isReminderOn?: boolean;

  /** Custom reminder overrides */
  overrides?: EventReminder[];
}

export interface Event {
  /** Unique identifier for the event */
  id: string;

  /** Title or summary of the event */
  title: string;

  /** Detailed description or notes about the event */
  description?: string;

  /** ETag of the event for version control */
  etag?: string;

  /** Event start date and time */
  start: EventDateTime;

  /** Event end date and time */
  end: EventDateTime;

  /** Indicates whether the event lasts all day */
  isAllDay?: boolean;

  /** Physical or virtual location of the event */
  location?: string;

  /** ID representing the event color */
  colorId?: EventColorId;

  /** Custom color code applied to this event */
  customColor?: string;

  /** The user's response to the event invitation */
  myResponseStatus?: 'needsAction' | 'declined' | 'tentative' | 'accepted';

  /** List of attendees invited to the event */
  attendees?: EventAttendee[];

  /** Information about the organizer of the event */
  organizer?: EventActor;

  /** Information about the creator of the event */
  creator?: EventActor;

  /** Visibility level of the event */
  visibility?: 'default' | 'public' | 'private' | 'confidential';

  /** Indicates whether the event blocks time on the calendar */
  transparency?: 'transparent' | 'opaque';

  /** Type of the event */
  eventType?: 'default' | 'outOfOffice' | 'focusTime';

  /** Recurrence rules describing how often the event repeats */
  recurrence?: string[];

  /** ID of the recurring event this instance belongs to */
  recurringEventId?: string;

  /** Indicates whether the event is part of a recurring series */
  isRecurring?: boolean;

  /** Indicates whether the event is an exception in a recurring series */
  isException?: boolean;

  /** Indicates whether the event has been canceled */
  isCancelled?: boolean;

  /** Original start date and time of the event before modification */
  originalStart?: EventDateTime;

  /** Information about an associated conference meeting, if any */
  conferenceData?: ConferenceData;

  /** URL link to view the event in a calendar interface */
  webLink?: string;

  /** iCalendar UID for cross-system identification */
  iCalUid?: string;

  /** Event reminder settings */
  reminders?: EventReminders;

  /** Custom key-value properties visible to others */
  publicExtendedProperties?: Record<string, string>;

  /** Custom key-value properties visible only to the authenticated user */
  privateExtendedProperties?: Record<string, string>;

  /** ISO 8601 date-time when the event was created */
  createdAt?: string;

  /** ISO 8601 date-time when the event was last updated */
  updatedAt?: string;
}

export interface CreateEventInput {
  /** Optional custom ID for the event (if not provided, one will be generated) */
  id?: string;

  /** Title or summary of the event */
  title: string;

  /** Detailed description or notes about the event */
  description?: string;

  /** Event start date and time */
  start: EventDateTime;

  /** Event end date and time */
  end: EventDateTime;

  /** Indicates whether the event lasts all day */
  isAllDay?: boolean;

  /** Physical or virtual location of the event */
  location?: string;

  /** ID representing the event color */
  colorId?: EventColorId;

  /** Custom color code applied to this event */
  customColor?: string;

  /** The user's response to the event invitation */
  myResponseStatus?: 'needsAction' | 'declined' | 'tentative' | 'accepted';

  /** List of attendees invited to the event */
  attendees?: EventAttendee[];

  /** Visibility level of the event */
  visibility?: 'default' | 'public' | 'private' | 'confidential';

  /** Indicates whether the event blocks time on the calendar */
  transparency?: 'transparent' | 'opaque';

  /** Type of the event */
  eventType?: 'default' | 'outOfOffice' | 'focusTime';

  /** Recurrence rules describing how often the event repeats */
  recurrence?: string[];

  /** ID of the recurring event this instance belongs to */
  recurringEventId?: string;

  /** Indicates whether the event is part of a recurring series */
  isRecurring?: boolean;

  /** Indicates whether the event is an exception in a recurring series */
  isException?: boolean;

  /** Indicates whether the event has been canceled */
  isCancelled?: boolean;

  /** Original start date and time of the event before modification */
  originalStart?: EventDateTime;

  /** Information about an associated conference meeting, if any */
  conferenceData?: ConferenceData;

  /** URL link to view the event in a calendar interface */
  webLink?: string;

  /** Event reminder settings */
  reminders?: EventReminders;

  /** Custom key-value properties visible to others */
  publicExtendedProperties?: Record<string, string>;

  /** Custom key-value properties visible only to the authenticated user */
  privateExtendedProperties?: Record<string, string>;

  /** Information about the organizer of the event */
  organizer?: EventActor;

  /** Information about the creator of the event */
  creator?: EventActor;

  /** Provider used to automatically generate a meeting URL */
  generateMeetingUrlProvider?: string;
}

export interface UpdateEventInput extends Partial<
  Omit<CreateEventInput, 'id' | 'generateMeetingUrlProvider'>
> {}

export interface ListEventsParams extends PaginationParams {
  /** ISO 8601 date-time to filter events that start after this time */
  startDateTime?: Date | string;

  /** ISO 8601 date-time to filter events that end before this time */
  endDateTime?: Date | string;

  /** Display all events in the specified time zone */
  timeZone?: string;

  /** JSON object to filter events by custom properties */
  metadataFilters?: Record<string, string>;

  /** Whether to expand the recurrence of recurring events into individual events. If provided, startDateTime and endDateTime are required. By default recurring events are not expanded */
  expandRecurrences?: boolean;

  /** Search for events by title */
  search?: string;

  /** Filter for all-day events only */
  isAllDay?: boolean;

  /** Include or exclude cancelled events */
  isCancelled?: boolean;

  /** Only return events updated after this date/time (ISO 8601 format or Date object) */
  updatedAfter?: Date | string;

  /** Field to order events by. Only available when expandRecurrences is true */
  orderBy?: EventOrderBy;
}

export interface RSVPInput {
  /** The user's response to the event invitation */
  responseStatus: 'needsAction' | 'declined' | 'tentative' | 'accepted';
}
