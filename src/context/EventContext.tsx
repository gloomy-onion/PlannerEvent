import axios, { AxiosResponse } from 'axios';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useAuth } from './AuthContext';
import { api, httpClient, TOKEN } from '../api/api';

export type CalendarEvent = {
  id: number;
  dateStart: string;
  dateEnd: string;
  time: string;
  title: string;
  location: string;
  description: string;
  photos: Photo[];
  type: 'created' | 'accede' | 'future' | 'past';
  participants: string[];
  owner: number | string;
};

type Photo = {
  id: number;
  name: string;
  url: string;
};

type EventsContextType = {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => void;
  createEvent: (newEvent: Partial<CalendarEvent>) => Promise<void>;
  joinEvent: (eventId: number) => Promise<void>;
  deleteEvent: (eventId: number) => Promise<void>;
  leaveEvent: (eventId: number) => Promise<void>;
  getEvent: (eventId: number) => Promise<CalendarEvent | null>;
  isParticipant: (eventId: number) => Promise<boolean>;
};

const EventsContext = createContext<EventsContextType | undefined>(undefined);

type EventsProviderProps = {
  children: ReactNode;
};

export const EventsProvider = ({ children }: EventsProviderProps) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<{ data: CalendarEvent[] }> = await api.getEvents();
      const allEvents = response.data.data;

      const now = new Date().toISOString();

      const filteredEvents = allEvents
        .map((event) => {
          if (user && event.participants.includes(String(user.id))) {
            return { ...event, type: 'accede' as const };
          }
          if (event.dateStart > now) {
            return { ...event, type: 'future' as const };
          }

          return { ...event, type: 'past' as const };
        })
        .filter((event) => (user ? true : event.type )) as CalendarEvent[];

      setEvents(filteredEvents);
    } catch (err) {
      setError('Не удалось загрузить события, попробуйте позже');
    } finally {
      setLoading(false);
    }
  };

  const getEvent = async (eventId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<{ data: CalendarEvent }> = await httpClient.get(`/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      return response.data.data;
    } catch (err) {
      setError('Не удалось загрузить событие, попробуйте позже');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (newEvent: Partial<CalendarEvent>) => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<{ data: CalendarEvent }> = await httpClient.post(
        '/events',
        {
          dateStart: newEvent.dateStart,
          dateEnd: newEvent.dateEnd,
          title: newEvent.title,
          description: newEvent.description,
          location: newEvent.location,
          photos: newEvent.photos?.map((photo) => photo.id),
          participants: newEvent.participants,
          owner: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );
      setEvents((prevEvents) => [...prevEvents, { ...response.data.data, type: 'created' }]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError('Произошла ошибка при создании события. Пожалуйста, попробуйте позже.');
      }
    } finally {
      setLoading(false);
    }
  };

  const joinEvent = async (eventId: number) => {
    setLoading(true);
    setError(null);
    try {
      await httpClient.post(
        `/events/${eventId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === eventId ? { ...event, type: 'accede' } : event)),
      );
    } catch (err) {
      setError('Не удалось присоединиться к событию, попробуйте позже');
    } finally {
      setLoading(false);
    }
  };

  const leaveEvent = async (eventId: number) => {
    setLoading(true);
    setError(null);
    try {
      await httpClient.post(
        `/events/${eventId}/leave`,
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );
    } catch (err) {
      setError('Не удалось присоединиться к событию, попробуйте позже');
    } finally {
      setLoading(false);
    }
  };

  const isParticipant = async (eventId: number): Promise<boolean> => {
    const event = await getEvent(eventId);

    return event ? event.participants.includes(String(user?.id)) : false;
  };

  const deleteEvent = async (eventId: number) => {
    setLoading(true);
    setError(null);
    try {
      await httpClient.delete(`/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (err) {
      setError('Не удалось удалить событие, попробуйте позже');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        loading,
        error,
        fetchEvents,
        createEvent,
        joinEvent,
        deleteEvent,
        leaveEvent,
        getEvent,
        isParticipant,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = (): EventsContextType => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents должен быть внутри EventsProvider');
  }

  return context;
};
