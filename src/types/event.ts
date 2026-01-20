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
  dateTime?: string;
  timeZone?: string;
}

export interface EventAttendee {
  id?: string;
  name?: string;
  email: string;
  responseStatus?: 'needsAction' | 'declined' | 'tentative' | 'accepted';
}

export interface EventActor {
  id?: string;
  name?: string;
  email?: string;
  isSelf?: boolean;
}

export interface ConferenceData {
  conferenceId?: string;
  joinUrl?: string;
  conferenceType?: string;
  conferenceDetails?: Record<string, any>;
}

export interface EventReminder {
  method?: string;
  minutes?: number;
}

export interface EventReminders {
  useDefault?: boolean;
  isReminderOn?: boolean;
  overrides?: EventReminder[];
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  start: EventDateTime;
  end: EventDateTime;
  isAllDay?: boolean;
  location?: string;
  colorId?: EventColorId;
  customColor?: string;
  myResponseStatus?: 'needsAction' | 'declined' | 'tentative' | 'accepted';
  attendees?: EventAttendee[];
  organizer?: EventActor;
  creator?: EventActor;
  visibility?: 'default' | 'public' | 'private' | 'confidential';
  transparency?: 'transparent' | 'opaque';
  eventType?: 'default' | 'outOfOffice' | 'focusTime';
  recurrence?: string[];
  recurringEventId?: string;
  isRecurring?: boolean;
  isException?: boolean;
  isCancelled?: boolean;
  originalStart?: EventDateTime;
  conferenceData?: ConferenceData;
  webLink?: string;
  reminders?: EventReminders;
  publicExtendedProperties?: Record<string, string>;
  privateExtendedProperties?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEventInput {
  id?: string;
  title: string;
  description?: string;
  start: EventDateTime;
  end: EventDateTime;
  isAllDay?: boolean;
  location?: string;
  colorId?: EventColorId;
  customColor?: string;
  myResponseStatus?: 'needsAction' | 'declined' | 'tentative' | 'accepted';
  attendees?: EventAttendee[];
  visibility?: 'default' | 'public' | 'private' | 'confidential';
  transparency?: 'transparent' | 'opaque';
  eventType?: 'default' | 'outOfOffice' | 'focusTime';
  recurrence?: string[];
  recurringEventId?: string;
  isRecurring?: boolean;
  isException?: boolean;
  isCancelled?: boolean;
  originalStart?: EventDateTime;
  conferenceData?: ConferenceData;
  webLink?: string;
  reminders?: EventReminders;
  publicExtendedProperties?: Record<string, string>;
  privateExtendedProperties?: Record<string, string>;
  organizer?: EventActor;
  creator?: EventActor;
  generateMeetingUrlProvider?: string;
}

export interface UpdateEventInput extends Partial<Omit<CreateEventInput, 'id' | 'generateMeetingUrlProvider'>> {}

export interface ListEventsParams extends PaginationParams {
  startDateTime?: Date | string;
  endDateTime?: Date | string;
  timeZone?: string;
  metadataFilters?: Record<string, any>;
  expandRecurrences?: boolean;
  search?: string;
  isAllDay?: boolean;
  isCancelled?: boolean;
  updatedAfter?: Date | string;
  orderBy?: EventOrderBy;
}

export interface RSVPInput {
  attendees: EventAttendee[];
}
