import React, { createContext, useContext, useMemo, useState } from 'react';
import { initialUser } from '../data/user';
import { login, logout, register } from '../services/authService';
import { updateProfile } from '../services/profileService';
import { recordActivity } from '../services/progressService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(initialUser);

  const completeActivity = (minutes, words = 0) => {
    setUser((currentUser) => recordActivity(currentUser, { minutes, words }));
  };

  const registerUser = async (credentials) => {
    const registeredUser = await register(credentials);
    setUser(registeredUser);
    return registeredUser;
  };

  const loginUser = async (credentials) => {
    const loggedUser = await login(credentials);
    setUser(loggedUser);
    return loggedUser;
  };

  const editProfile = (changes) => {
    setUser((currentUser) => updateProfile(currentUser, changes));
  };

  const logoutUser = async () => {
    await logout();
    setUser(initialUser);
  };

  const value = useMemo(() => ({
    user,
    completeActivity,
    registerUser,
    loginUser,
    editProfile,
    logoutUser,
  }), [user]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp debe utilizarse dentro de AppProvider');
  }

  return context;
}


