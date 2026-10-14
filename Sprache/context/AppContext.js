import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login, logout, register, restoreSession, updateStoredUser } from '../services/authService';
import { updateProfile } from '../services/profileService';
import { recordActivity, resetProgress } from '../services/progressService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    restoreSession()
      .then((restoredUser) => {
        if (isMounted) {
          setUser(restoredUser);
        }
      })
      .catch(() => {
        if (isMounted) {
          setUser(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const completeActivity = async (session) => {
    const updatedUser = await updateStoredUser((currentUser) => recordActivity(currentUser, session));
    setUser(updatedUser);
    return updatedUser;
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

  const editProfile = async (changes) => {
    const updatedUser = await updateStoredUser((currentUser) => updateProfile(currentUser, changes));
    setUser(updatedUser);
    return updatedUser;
  };

  const resetUserProgress = async () => {
    const updatedUser = await updateStoredUser(resetProgress);
    setUser(updatedUser);
    return updatedUser;
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isLoading,
    completeActivity,
    registerUser,
    loginUser,
    editProfile,
    resetUserProgress,
    logoutUser,
  }), [user, isLoading]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp debe utilizarse dentro de AppProvider');
  }

  return context;
}


