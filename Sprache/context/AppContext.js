import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { login, logout, register, restoreSession, updateStoredUser } from '../services/authService';
import { updateProfile } from '../services/profileService';
import { recordActivity, resetProgress } from '../services/progressService';
import { updateFailedWords } from '../services/lessonProgressService';
import { updateLearningProgress } from '../services/learningProgressService';
import { selectMascotAccessory } from '../services/mascotRewardsService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userUpdateQueue = useRef(Promise.resolve());

  const persistUserUpdate = useCallback((update) => {
    const operation = userUpdateQueue.current.then(() => updateStoredUser(update));
    userUpdateQueue.current = operation.catch((error) => {
      console.error('No se pudo guardar el progreso local.', error);
    });
    return operation;
  }, []);

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
    const updatedUser = await persistUserUpdate((currentUser) => recordActivity(currentUser, session));
    setUser(updatedUser);
    return updatedUser;
  };

  const saveLessonProgress = useCallback(async (progress) => {
    const updatedUser = await persistUserUpdate((currentUser) => ({
      ...currentUser,
      activeLessonProgress: progress,
    }));
    setUser(updatedUser);
    return updatedUser;
  }, [persistUserUpdate]);

  const saveWordAttempt = useCallback(async (question, correct) => {
    const updatedUser = await persistUserUpdate((currentUser) => ({
      ...currentUser,
      failedWords: updateFailedWords(currentUser.failedWords, question, correct),
    }));
    setUser(updatedUser);
    return updatedUser;
  }, [persistUserUpdate]);

  const saveLearningProgress = useCallback(async (section, key, progress) => {
    const updatedUser = await persistUserUpdate((currentUser) => ({
      ...currentUser,
      learningProgress: updateLearningProgress(currentUser.learningProgress, section, key, progress),
    }));
    setUser(updatedUser);
    return updatedUser;
  }, [persistUserUpdate]);

  const saveMascotAccessory = useCallback(async (slot, accessoryId) => {
    const updatedUser = await persistUserUpdate((currentUser) => ({
      ...currentUser,
      mascot: selectMascotAccessory(currentUser.mascot, slot, accessoryId),
    }));
    setUser(updatedUser);
    return updatedUser;
  }, [persistUserUpdate]);

  const dismissMascotRewardNotice = useCallback(async () => {
    const updatedUser = await persistUserUpdate((currentUser) => ({
      ...currentUser,
      mascot: { ...currentUser.mascot, newlyUnlockedAccessoryIds: [] },
    }));
    setUser(updatedUser);
    return updatedUser;
  }, [persistUserUpdate]);

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
    const updatedUser = await persistUserUpdate((currentUser) => updateProfile(currentUser, changes));
    setUser(updatedUser);
    return updatedUser;
  };

  const resetUserProgress = async () => {
    const updatedUser = await persistUserUpdate(resetProgress);
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
    saveLessonProgress,
    saveWordAttempt,
    saveLearningProgress,
    saveMascotAccessory,
    dismissMascotRewardNotice,
    completeActivity,
    registerUser,
    loginUser,
    editProfile,
    resetUserProgress,
    logoutUser,
  }), [user, isLoading, saveLessonProgress, saveWordAttempt, saveLearningProgress, saveMascotAccessory, dismissMascotRewardNotice]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp debe utilizarse dentro de AppProvider');
  }

  return context;
}
