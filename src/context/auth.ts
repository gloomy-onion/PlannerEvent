import { httpClient, TOKEN } from '../api/api';

export const fetchMe = () => {
  return httpClient.get('users/me', {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};