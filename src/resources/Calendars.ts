/**
 * Calendars resource client
 */

import { BaseClient } from '../client/BaseClient';
import {
  Calendar,
  CreateCalendarInput,
  UpdateCalendarInput,
  ListCalendarsParams,
  PaginatedResponse,
} from '../types';

export class Calendars {
  constructor(private client: BaseClient) {}

  /**
   * List all calendars for an end user account
   * @param endUserAccountId - The end user account ID
   * @param params - Optional pagination and filter parameters
   */
  async list(
    endUserAccountId: string,
    params?: ListCalendarsParams
  ): Promise<PaginatedResponse<Calendar>> {
    const url = this.client.buildUrl(
      `/api/v1/calendars/${endUserAccountId}`,
      params
    );
    return this.client.get<PaginatedResponse<Calendar>>(url);
  }

  /**
   * Get a specific calendar by ID
   * @param endUserAccountId - The end user account ID
   * @param calendarId - The calendar ID
   */
  async get(
    endUserAccountId: string,
    calendarId: string
  ): Promise<Calendar> {
    return this.client.get<Calendar>(
      `/api/v1/calendars/${endUserAccountId}/${calendarId}`
    );
  }

  /**
   * Create a new calendar
   * @param endUserAccountId - The end user account ID
   * @param data - Calendar creation data
   */
  async create(
    endUserAccountId: string,
    data: CreateCalendarInput
  ): Promise<Calendar> {
    return this.client.post<Calendar>(
      `/api/v1/calendars/${endUserAccountId}`,
      data
    );
  }

  /**
   * Update a calendar
   * @param endUserAccountId - The end user account ID
   * @param calendarId - The calendar ID
   * @param data - Calendar update data
   */
  async update(
    endUserAccountId: string,
    calendarId: string,
    data: UpdateCalendarInput
  ): Promise<Calendar> {
    return this.client.put<Calendar>(
      `/api/v1/calendars/${endUserAccountId}/${calendarId}`,
      data
    );
  }

  /**
   * Delete a calendar
   * @param endUserAccountId - The end user account ID
   * @param calendarId - The calendar ID
   */
  async delete(
    endUserAccountId: string,
    calendarId: string
  ): Promise<{ success: boolean }> {
    return this.client.delete(
      `/api/v1/calendars/${endUserAccountId}/${calendarId}`
    );
  }
}
