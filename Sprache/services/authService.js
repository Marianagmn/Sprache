import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { createAuthService } from './authServiceCore.js';
import { api, isRemoteApiConfigured, setApiToken } from './apiService.js';

const authService = createAuthService({ storage: AsyncStorage, crypto: Crypto });
const TOKEN_KEY = '@sprache/api/token-v1';
const REMOTE_USER_KEY = '@sprache/api/user-v1';

function normalizeRemoteUser(user) {
  const level = user.level || 'A1';
  return {
    ...user,
    level: level.startsWith('Nivel ') ? level : `Nivel ${level}`,
    dailyGoal: user.dailyGoal ?? user.dailyGoalMinutes ?? 10,
    sessions: Array.isArray(user.sessions) ? user.sessions : [],
    failedWords: user.failedWords && typeof user.failedWords === 'object' ? user.failedWords : {},
    wordProgress: user.wordProgress && typeof user.wordProgress === 'object' ? user.wordProgress : {},
    learningProgress: user.learningProgress || { readings: {}, theory: {}, pronunciation: {} },
  };
}

export async function cacheRemoteUser(user) {
  const normalizedUser = normalizeRemoteUser(user);
  await AsyncStorage.setItem(REMOTE_USER_KEY, JSON.stringify(normalizedUser));
  return normalizedUser;
}

async function saveRemoteSession({ token, user }) {
  setApiToken(token);
  await AsyncStorage.setItem(TOKEN_KEY, token);
  return cacheRemoteUser(user);
}

async function register(credentials) {
  if (!isRemoteApiConfigured) return authService.register(credentials);
  const response = await api.post('/auth/register', {
    ...credentials,
    initialLevel: (credentials.level || 'A1').replace(/^Nivel\s+/i, ''),
    dailyGoalMinutes: Number(credentials.dailyGoal ?? credentials.dailyGoalMinutes ?? 10),
  });
  return saveRemoteSession(response);
}

async function login(credentials) {
  if (!isRemoteApiConfigured) return authService.login(credentials);
  const response = await api.post('/auth/login', credentials);
  return saveRemoteSession(response);
}

async function restoreSession() {
  if (!isRemoteApiConfigured) return authService.restoreSession();
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  setApiToken(token);
  try {
    const response = await api.get('/auth/me');
    return cacheRemoteUser(response.user);
  } catch (error) {
    if (error.status === 401) {
      await AsyncStorage.multiRemove([TOKEN_KEY, REMOTE_USER_KEY]);
      setApiToken(null);
      return null;
    }
    throw error;
  }
}

async function updateStoredUser(update) {
  if (!isRemoteApiConfigured) return authService.updateStoredUser(update);
  const storedUser = await AsyncStorage.getItem(REMOTE_USER_KEY);
  if (!storedUser) throw new Error('No encontramos una cuenta remota activa.');
  return cacheRemoteUser(update(JSON.parse(storedUser)));
}

async function logout() {
  if (!isRemoteApiConfigured) return authService.logout();
  await AsyncStorage.multiRemove([TOKEN_KEY, REMOTE_USER_KEY]);
  setApiToken(null);
}

export { register, login, restoreSession, updateStoredUser, logout };