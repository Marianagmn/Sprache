import React, { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

const DEMO_ACCOUNT = {
  email: 'mariana@sprache.app',
  password: 'sprache123',
  user: {
    name: 'Mariana',
    level: 'Nivel A2',
    streak: 4,
    todayMinutes: 7,
    dailyGoal: 10,
    studiedMinutes: 42,
    learnedWords: 127,
    completedActivities: 0,
  },
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(DEMO_ACCOUNT);

  const registerUser = async ({ name, email, password, level, dailyGoal }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!name.trim() || !normalizedEmail || !password) {
      throw new Error('Completa todos los campos para continuar.');
    }
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      throw new Error('Introduce un correo electrónico válido.');
    }
    if (password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }

    const newAccount = {
      email: normalizedEmail,
      password,
      user: {
        name: name.trim(),
        level: `Nivel ${level}`,
        streak: 0,
        todayMinutes: 0,
        dailyGoal,
        studiedMinutes: 0,
        learnedWords: 0,
        completedActivities: 0,
      },
    };
    setAccount(newAccount);
    setUser(newAccount.user);
  };

  const loginUser = async ({ email, password }) => {
    if (email.trim().toLowerCase() !== account.email || password !== account.password) {
      throw new Error('El correo o la contraseña no son correctos.');
    }
    setUser(account.user);
  };

  const logoutUser = async () => setUser(null);

  const completeActivity = async ({ correctAnswers, totalQuestions }) => {
    setUser((current) => {
      if (!current) return current;
      return {
        ...current,
        todayMinutes: current.todayMinutes + 5,
        studiedMinutes: current.studiedMinutes + 5,
        learnedWords: current.learnedWords + correctAnswers,
        completedActivities: current.completedActivities + 1,
      };
    });
    setAccount((current) => ({
      ...current,
      user: {
        ...current.user,
        todayMinutes: current.user.todayMinutes + 5,
        studiedMinutes: current.user.studiedMinutes + 5,
        learnedWords: current.user.learnedWords + correctAnswers,
        completedActivities: current.user.completedActivities + 1,
        lastSessionScore: totalQuestions > 0 ? correctAnswers / totalQuestions : 0,
      },
    }));
  };

  const value = useMemo(
    () => ({ user, registerUser, loginUser, logoutUser, completeActivity }),
    [account, user],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe utilizarse dentro de AppProvider.');
  }
  return context;
}
