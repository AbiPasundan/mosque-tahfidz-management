import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

const baseURL = rawBaseUrl.includes('/api/v1')
  ? rawBaseUrl.split('/api/v1')[0]
  : rawBaseUrl;

export const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});
