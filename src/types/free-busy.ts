/**
 * Free/Busy types
 */

import { EventDateTime } from "./event";

export interface BusySlot {
  start?: EventDateTime;
  end?: EventDateTime;
}

export interface FreeBusySlot {
  calendarId: string;
  busySlots?: BusySlot[];
}

export type FreeBusyResponse = FreeBusySlot[];

export interface GetFreeBusyInput {
  startDateTime: Date | string;
  endDateTime: Date | string;
  timeZone: string;
  calendarIds: string[];
}
