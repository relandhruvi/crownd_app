import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, setToken, saveSession, loadSession, clearSession } from './api';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'creator' | 'brand' | null

  useEffect(() => {
    api.warmUp();
    (async () => {
      const s = await loadSession();
      if (s?.token) {
        setToken(s.token);
        setUser(s.user || { email: s.email });
        setRole(s.role || 'creator');
      } else if (s?.role) {
        setRole(s.role);
      }
      setReady(true);
    })();
  }, []);

  const chooseRole = useCallback(async (selectedRole) => {
    setRole(selectedRole);
    const s = (await loadSession()) || {};
    await saveSession({ ...s, role: selectedRole });
  }, []);

  const resetRole = useCallback(async () => {
    setRole(null);
    const s = (await loadSession()) || {};
    await saveSession({ ...s, role: null });
  }, []);

  const finish = useCallback(async (token, fallbackUser) => {
    setToken(token);
    let u = fallbackUser;
    try {
      u = { ...fallbackUser, ...(await api.me()) };
    } catch {}
    setUser(u);
    setRole('creator');
    await saveSession({ token, user: u, email: u?.email, role: 'creator' });
  }, []);

  const signIn = async (email, password) => {
    const t = await api.login(email, password);
    await finish(t.access_token, { email });
  };

  const signUp = async (form) => {
    const r = await api.signup(form);
    await finish(r.access_token, r.user);
  };

  const confirmPassword = async (password) => {
    await api.login(user.email, password);
    return true;
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    setRole(null);
    await clearSession();
  };

  return (
    <Ctx.Provider value={{ ready, user, role, chooseRole, resetRole, signIn, signUp, signOut, confirmPassword }}>
      {children}
    </Ctx.Provider>
  );
}
