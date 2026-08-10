import axios from 'axios';

const isLocalHost = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  /^192\.168\./.test(window.location.hostname) ||
  /^10\./.test(window.location.hostname)
);

// In production, same-origin requests hit the /api rewrite in vercel.json,
// which proxies to the backend deployment. REACT_APP_API_URL only overrides
// this when it is an https URL, so a stale http:// value can't break the app.
const envApiUrl = (process.env.REACT_APP_API_URL || '').trim();
const API_BASE_URL = isLocalHost
  ? `http://${window.location.hostname}:5001`
  : (envApiUrl.startsWith('https://') ? envApiUrl.replace(/\/$/, '') : '');

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 40000, // 40s — prevents indefinite hangs during Vercel cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only clear session and redirect on a definitive 401 from the server.
    // Do NOT logout on network errors (error.response is undefined),
    // timeouts, or 5xx server errors — these are transient (Vercel cold starts, etc.)
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    } else if (error.response?.status === 403) {
      console.warn('Access forbidden (403):', error.config?.url);
    }
    // For network errors / timeouts / 5xx: just reject so the caller can handle it gracefully
    return Promise.reject(error);
  }
);

export default apiClient;
