/**
 * Free/Busy types
 */

import { EventDateTime } from "./event";

export interface BusySlot {
  /** Start date and time of the busy period */
  start?: EventDateTime;
  
  /** End date and time of the busy period */
  end?: EventDateTime;
}

export interface FreeBusySlot {
  /** ID of the calendar these busy slots belong to */
  calendarId: string;
  
  /** Array of time slots when the calendar is busy */
  busySlots?: BusySlot[];
}

export type FreeBusyResponse = FreeBusySlot[];

export interface GetFreeBusyInput {
  /** ISO 8601 date-time representing the start of the time range to retrieve free/busy information for */
  startDateTime: Date | string;
  
  /** ISO 8601 date-time representing the end of the time range to retrieve free/busy information for */
  endDateTime: Date | string;
  
  /** Display all dates in the specified time zone */
  timeZone: string;
  
  /** Calendar IDs to retrieve free/busy information for */
  calendarIds: string[];
}
