import axios from 'axios';

export const API_TOKEN = localStorage.getItem('token');

export const BASE_URL = 'https://planner.rdclr.ru/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});
