import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { initialUser } from '../data/user';
import { deriveProgress } from './progressService';

const ACCOUNTS_KEY = '@sprache/demo/accounts-v1';
const SESSION_KEY = '@sprache/demo/session-v1';

async function readAccounts() {
  const storedAccounts = await AsyncStorage.getItem(ACCOUNTS_KEY);
  if (!storedAccounts) {
    return [];
  }

  try {
    const accounts = JSON.parse(storedAccounts);
    return Array.isArray(accounts) ? accounts : [];
  } catch {
    await AsyncStorage.removeItem(ACCOUNTS_KEY);
    return [];
  }
}

async function hashPassword(password, salt) {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${salt}:${password}`,
  );
}

function hydrateUser(storedUser) {
  const user = {
    ...initialUser,
    ...storedUser,
    sessions: Array.isArray(storedUser.sessions) ? storedUser.sessions : [],
    wordProgress: storedUser.wordProgress && typeof storedUser.wordProgress === 'object' ? storedUser.wordProgress : {},
    preferences: {
      ...initialUser.preferences,
      ...storedUser.preferences,
    },
  };

  return { ...user, ...deriveProgress(user) };
}

function toHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function register({ name, email, password, level = 'A2', dailyGoal = 10, motivation }) {
  const normalizedName = name?.trim();
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedName || !normalizedEmail || !password) {
    throw new Error('Completa todos los campos para crear tu cuenta.');
  }
  if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
    throw new Error('Introduce un correo electrónico válido.');
  }
  if (password.length < 8) {
    throw new Error('La contraseña debe tener al menos 8 caracteres.');
  }

  const accounts = await readAccounts();
  if (accounts.some((account) => account.email === normalizedEmail)) {
    throw new Error('Ya existe una cuenta con este correo. Inicia sesión para continuar.');
  }

  const salt = toHex(await Crypto.getRandomBytesAsync(16));
  const user = {
    ...initialUser,
    name: normalizedName,
    email: normalizedEmail,
    level: level ? `Nivel ${level}` : initialUser.level,
    motivation: motivation || initialUser.motivation || 'Viajar',
    dailyGoal,
    todayMinutes: 0,
    studiedMinutes: 0,
    learnedWords: 0,
    streak: 0,
    sessions: [],
    wordProgress: {},
    preferences: {
      notificationsEnabled: false,
    },
  };
  const account = {
    email: normalizedEmail,
    passwordSalt: salt,
    passwordHash: await hashPassword(password, salt),
    user,
  };

  await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
  await AsyncStorage.setItem(SESSION_KEY, normalizedEmail);
  return user;
}

export async function login({ email, password }) {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    throw new Error('Introduce tu correo y contraseña.');
  }

  const accounts = await readAccounts();
  const account = accounts.find((savedAccount) => savedAccount.email === normalizedEmail);
  if (!account) {
    throw new Error('No encontramos una cuenta con ese correo. Crea una cuenta antes de iniciar sesión.');
  }

  const submittedHash = await hashPassword(password, account.passwordSalt);
  if (submittedHash !== account.passwordHash) {
    throw new Error('La contraseña no es correcta. Revisa la contraseña e inténtalo otra vez.');
  }

  await AsyncStorage.setItem(SESSION_KEY, normalizedEmail);
  const user = hydrateUser(account.user);
  const updatedAccounts = [...accounts];
  updatedAccounts[accounts.indexOf(account)] = { ...account, user };
  await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
  return user;
}

export async function restoreSession() {
  const email = await AsyncStorage.getItem(SESSION_KEY);
  if (!email) {
    return null;
  }

  const accounts = await readAccounts();
  const account = accounts.find((savedAccount) => savedAccount.email === email);
  if (!account) {
    await AsyncStorage.removeItem(SESSION_KEY);
    return null;
  }

  const restoredUser = hydrateUser(account.user);
  const updatedAccounts = [...accounts];
  updatedAccounts[accounts.indexOf(account)] = { ...account, user: restoredUser };
  await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
  return restoredUser;
}

export async function updateStoredUser(update) {
  const email = await AsyncStorage.getItem(SESSION_KEY);
  if (!email) {
    throw new Error('Inicia sesión para guardar los cambios.');
  }

  const accounts = await readAccounts();
  const accountIndex = accounts.findIndex((savedAccount) => savedAccount.email === email);
  if (accountIndex < 0) {
    throw new Error('No encontramos la cuenta local activa.');
  }

  const updatedUser = update(accounts[accountIndex].user);
  const updatedAccounts = [...accounts];
  updatedAccounts[accountIndex] = { ...updatedAccounts[accountIndex], user: updatedUser };
  await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
  return updatedUser;
}

export async function logout() {
  await AsyncStorage.removeItem(SESSION_KEY);
}