import axios from 'axios';

import { LocalStorageKeys, localStorageService } from '../services/localStorage';

export const TOKEN = localStorageService.get(LocalStorageKeys.TOKEN);

export const BASE_URL = 'https://planner.rdclr.ru/api';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export const api = {
  getUsers: () => httpClient.get('/users'),
  login: (email: string, password: string) =>
    httpClient.post('/auth/local', {
      identifier: email,
      password,
    }),
  register: (email: string, password: string, username: string) =>
    httpClient.post('/auth/local/register', {
      email,
      password,
      username,
    }),
  fetchMe: () =>
    httpClient.get('users/me', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }),
  getEvents: () => httpClient.get('/events')

};
