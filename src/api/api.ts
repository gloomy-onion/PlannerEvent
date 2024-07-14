import axios from 'axios';

export const TOKEN = localStorage.getItem('token');

export const BASE_URL = 'https://localhost:1337/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});
