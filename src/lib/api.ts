import axios from "axios";

let baseURL = import.meta.env.VITE_API_BASE_URL || "/";

if (baseURL.includes('/api/v1')) {
  baseURL = baseURL.replace(/\/api\/v1\/?$/, '');
}
if (baseURL === '') baseURL = '/';

export const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});
