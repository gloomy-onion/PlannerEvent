import { api, TOKEN } from '../api/api';

export const fetchMe = () => {
  return api.get('users/me', {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};