// Only public values live here. Razorpay key_id comes from the backend's
// /wallet/load response, and the key secret never leaves the server.
export const API_BASE = 'https://crownd3.onrender.com';
export const REQUEST_TIMEOUT_MS = 45000; // Render free tier cold starts are slow
