const trimTrailingSlashes = (url = '') => url.replace(/\/+$/, '');

const runtimeApiBaseUrl = window?.__APP_CONFIG__?.API_BASE_URL;
const buildTimeApiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const API_BASE_URL = trimTrailingSlashes(
  runtimeApiBaseUrl || buildTimeApiBaseUrl || 'http://localhost:3001'
);

export const PUBLIC_TODOS_API_BASE_URL = 'https://jsonplaceholder.typicode.com';
