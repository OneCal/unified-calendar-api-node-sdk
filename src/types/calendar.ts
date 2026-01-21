/**
 * Calendar types
 */

import { PaginationParams } from './common';

export interface Calendar {
  /** Unique identifier for the calendar */
  id: string;
  
  /** Display name of the calendar */
  name: string;
  
  /** Hexadecimal color code representing the calendar's color */
  hexColor?: string;
  
  /** Indicates whether the calendar is a read-only calendar */
  readOnly?: boolean;
  
  /** Indicates whether this calendar is the primary calendar within this End User Account */
  isPrimary?: boolean;
  
  /** Indicates whether the calendar is a shared calendar to this End User Account */
  isShared?: boolean;
  
  /** Time zone associated with the calendar */
  timeZone?: string;
  
  /** Email address used for calendar invitations to and from this calendar */
  inviteEmail?: string;
  
  /** List of allowed online meeting providers for this calendar */
  allowedOnlineMeetingProviders?: string[];
  
  /** Default online meeting provider used for this calendar */
  defaultOnlineMeetingProvider?: string;
}

export interface CreateCalendarInput {
  /** Display name for the new calendar */
  name: string;
  
  /** Hexadecimal color code for the calendar */
  hexColor?: string;
  
  /** Time zone associated with the calendar */
  timeZone?: string;
}

export interface UpdateCalendarInput {
  /** Updated display name for the calendar */
  name?: string;
  
  /** Updated hexadecimal color code for the calendar */
  hexColor?: string;
  
  /** Updated time zone associated with the calendar */
  timeZone?: string;
}

export interface ListCalendarsParams extends PaginationParams {
}
