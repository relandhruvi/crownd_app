import * as SecureStore from 'expo-secure-store';
import { API_BASE, REQUEST_TIMEOUT_MS } from '../config';

let token = null;
export const setToken = (t) => { token = t; };
export const getToken = () => token;

async function request(path, { method = 'GET', body, form } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  let payload;
  if (form) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    payload = new URLSearchParams(form).toString();
  } else if (body) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(API_BASE + path, { method, headers, body: payload, signal: ctrl.signal });
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }
    if (!res.ok) {
      const d = data && data.detail;
      const msg = typeof d === 'string'
        ? d
        : Array.isArray(d)
          ? d.map((x) => x.msg).join(', ')
          : `Request failed (${res.status})`;
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return data;
  } catch (e) {
    if (e.name === 'AbortError') {
      throw new Error('The server is taking too long to wake up. Try again in a few seconds.');
    }
    if (e.status) throw e;
    throw new Error('Could not reach Crownd. Check your internet connection.');
  } finally {
    clearTimeout(timer);
  }
}

async function firstOf(paths) {
  let last;
  for (const p of paths) {
    try {
      return await request(p);
    } catch (e) {
      last = e;
      if (e.status && e.status !== 404 && e.status !== 405) throw e;
    }
  }
  throw last;
}

export const api = {
  warmUp: () => fetch(API_BASE + '/docs').catch(() => {}),
  login: (email, password) => request('/auth/login', { method: 'POST', form: { username: email, password } }),
  signup: (b) => request('/auth/signup', { method: 'POST', body: b }),
  me: () => firstOf(['/auth/me', '/auth/profile', '/influencer/me']),
  score: () => request('/auth/score'),
  brands: () => request('/brands/'),
  eligibleBrands: () => request('/brands/eligible/me'),
  wallet: () => firstOf(['/wallet/balance', '/wallet/', '/wallet/me']),
  transactions: () => request('/wallet/transactions'),
  loadWallet: (amount) => request('/wallet/load', { method: 'POST', body: { amount } }),
  verifyPayment: (b) => request('/wallet/verify-payment', { method: 'POST', body: b }),
  initiatePurchase: (brand_id, amount) => request('/purchase/initiate', { method: 'POST', body: { brand_id, amount } }),
  submitPost: (purchase_id, post_url) => request('/post/submit', { method: 'POST', body: { purchase_id, post_url } }),
  brandApply: (b) => request('/brands/apply', { method: 'POST', body: b }),
  brandWalletLoad: (b) => request('/brands/wallet/load', { method: 'POST', body: b }),
};

const KEY = 'crownd_session';
export async function saveSession(s) {
  await SecureStore.setItemAsync(KEY, JSON.stringify(s));
}
export async function loadSession() {
  try {
    const r = await SecureStore.getItemAsync(KEY);
    return r ? JSON.parse(r) : null;
  } catch {
    return null;
  }
}
export async function clearSession() {
  try {
    await SecureStore.deleteItemAsync(KEY);
  } catch {}
}
