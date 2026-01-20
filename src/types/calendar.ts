/**
 * Calendar types
 */

import { PaginationParams } from './common';

export interface Calendar {
  id: string;
  name: string;
  hexColor?: string;
  timeZone?: string;
  isPrimary?: boolean;
  accessRole?: string;
  description?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCalendarInput {
  name: string;
  hexColor?: string;
  timeZone?: string;
}

export interface UpdateCalendarInput {
  name?: string;
  hexColor?: string;
  timeZone?: string;
}

export interface ListCalendarsParams extends PaginationParams {
  // Additional calendar-specific filters can be added here
}
