import axios from "axios";

let baseURL = import.meta.env.VITE_API_BASE_URL || "/";

// Robust stripping of any form of api/v1 or /api at the end, handling multiple occurrences or missing slashes
baseURL = baseURL.replace(/(?:\/?api\/v1\/?)+$/, '').replace(/\/api\/?$/, '');


if (!baseURL) baseURL = '/';

export const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});
