/**
 * Events resource client
 */

import { BaseClient } from '../client/BaseClient';
import {
  Event,
  CreateEventInput,
  UpdateEventInput,
  ListEventsParams,
  RSVPInput,
  PaginatedResponse,
} from '../types';

export class Events {
  constructor(private client: BaseClient) {}

  /**
   * List events in a calendar
   * @param endUserAccountId - The end user account ID
   * @param calendarId - The calendar ID
   * @param params - Optional filter parameters
   */
  async list(
    endUserAccountId: string,
    calendarId: string,
    params?: ListEventsParams
  ): Promise<PaginatedResponse<Event>> {
    const url = this.client.buildUrl(
      `/api/v1/events/${encodeURIComponent(endUserAccountId)}/${encodeURIComponent(calendarId)}`,
      params
    );
    return this.client.get<PaginatedResponse<Event>>(url);
  }

  /**
   * Get a specific event
   * @param endUserAccountId - The end user account ID
   * @param calendarId - The calendar ID
   * @param eventId - The event ID
   */
  async get(
    endUserAccountId: string,
    calendarId: string,
    eventId: string
  ): Promise<Event> {
    return this.client.get<Event>(
      `/api/v1/events/${encodeURIComponent(endUserAccountId)}/${encodeURIComponent(calendarId)}/${encodeURIComponent(eventId)}`
    );
  }

  /**
   * Create a new event
   * @param endUserAccountId - The end user account ID
   * @param calendarId - The calendar ID
   * @param data - Event creation data
   */
  async create(
    endUserAccountId: string,
    calendarId: string,
    data: CreateEventInput
  ): Promise<Event> {
    return this.client.post<Event>(
      `/api/v1/events/${encodeURIComponent(endUserAccountId)}/${encodeURIComponent(calendarId)}`,
      data
    );
  }

  /**
   * Update an event
   * @param endUserAccountId - The end user account ID
   * @param calendarId - The calendar ID
   * @param eventId - The event ID
   * @param data - Event update data
   */
  async update(
    endUserAccountId: string,
    calendarId: string,
    eventId: string,
    data: UpdateEventInput
  ): Promise<Event> {
    return this.client.put<Event>(
      `/api/v1/events/${encodeURIComponent(endUserAccountId)}/${encodeURIComponent(calendarId)}/${encodeURIComponent(eventId)}`,
      data
    );
  }

  /**
   * Delete an event
   * @param endUserAccountId - The end user account ID
   * @param calendarId - The calendar ID
   * @param eventId - The event ID
   */
  async delete(
    endUserAccountId: string,
    calendarId: string,
    eventId: string
  ): Promise<{ success: boolean }> {
    return this.client.delete(
      `/api/v1/events/${encodeURIComponent(endUserAccountId)}/${encodeURIComponent(calendarId)}/${encodeURIComponent(eventId)}`
    );
  }

  /**
   * Get event occurrences (for recurring events)
   * @param endUserAccountId - The end user account ID
   * @param calendarId - The calendar ID
   * @param eventId - The event ID
   * @param params - Optional filter parameters
   */
  async getOccurrences(
    endUserAccountId: string,
    calendarId: string,
    eventId: string,
    params?: ListEventsParams
  ): Promise<PaginatedResponse<Event>> {
    const url = this.client.buildUrl(
      `/api/v1/events/${encodeURIComponent(endUserAccountId)}/${encodeURIComponent(calendarId)}/${encodeURIComponent(eventId)}/occurrences`,
      params
    );
    return this.client.get<PaginatedResponse<Event>>(url);
  }

  /**
   * RSVP to an event
   * @param endUserAccountId - The end user account ID
   * @param calendarId - The calendar ID
   * @param eventId - The event ID
   * @param data - RSVP data with attendee response
   */
  async rsvp(
    endUserAccountId: string,
    calendarId: string,
    eventId: string,
    data: RSVPInput
  ): Promise<Event> {
    return this.client.post<Event>(
      `/api/v1/events/${encodeURIComponent(endUserAccountId)}/${encodeURIComponent(calendarId)}/${encodeURIComponent(eventId)}/rsvp`,
      data
    );
  }
}
