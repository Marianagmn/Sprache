import { initialUser } from '../data/user.js';
import { deriveProgress } from './progressService.js';

const ACCOUNTS_KEY = '@sprache/demo/accounts-v1';
const SESSION_KEY = '@sprache/demo/session-v1';

export function createAuthService({ storage, crypto, userDefaults = initialUser, deriveUserProgress = deriveProgress }) {
  async function readAccounts() {
    const storedAccounts = await storage.getItem(ACCOUNTS_KEY);
    if (!storedAccounts) {
      return [];
    }

    try {
      const accounts = JSON.parse(storedAccounts);
      return Array.isArray(accounts) ? accounts : [];
    } catch {
      await storage.removeItem(ACCOUNTS_KEY);
      return [];
    }
  }

  async function hashPassword(password, salt) {
    return crypto.digestStringAsync(
      crypto.CryptoDigestAlgorithm.SHA256,
      `${salt}:${password}`,
    );
  }

  function hydrateUser(storedUser) {
    const user = {
      ...userDefaults,
      ...storedUser,
      placementAssessment: storedUser.placementAssessment || null,
      sessions: Array.isArray(storedUser.sessions)
        ? storedUser.sessions.map((session) => (
          session && Number.isFinite(session.durationSeconds)
            ? session
            : { ...(session || {}), durationSeconds: 0, durationSource: 'estimated' }
        ))
        : [],
      wordProgress: storedUser.wordProgress && typeof storedUser.wordProgress === 'object' ? storedUser.wordProgress : {},
      failedWords: storedUser.failedWords
        && typeof storedUser.failedWords === 'object'
        && !Array.isArray(storedUser.failedWords)
        ? storedUser.failedWords
        : {},
      activeLessonProgress: storedUser.activeLessonProgress
        && typeof storedUser.activeLessonProgress === 'object'
        && !Array.isArray(storedUser.activeLessonProgress)
        ? storedUser.activeLessonProgress
        : null,
      preferences: {
        ...userDefaults.preferences,
        ...storedUser.preferences,
      },
    };

    return { ...user, ...deriveUserProgress(user) };
  }

  function toHex(bytes) {
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  async function register({ name, email, password, level = 'A1', dailyGoal = 10, motivation, placementAssessment = null }) {
    const normalizedName = name?.trim();
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password) {
      throw new Error('Revisa los datos: necesitamos tu nombre, correo y contraseña para crear la cuenta.');
    }
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      throw new Error('Revisa el correo: debe tener un formato válido.');
    }
    if (password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres. Puedes actualizarla e intentarlo de nuevo.');
    }

    const accounts = await readAccounts();
    if (accounts.some((account) => account.email === normalizedEmail)) {
      throw new Error('Ya hay una cuenta con este correo. Si es tuya, puedes iniciar sesión.');
    }

    const salt = toHex(await crypto.getRandomBytesAsync(16));
    const user = {
      ...userDefaults,
      name: normalizedName,
      email: normalizedEmail,
      level: level?.startsWith('Nivel ') ? level : `Nivel ${level}`,
      placementAssessment,
      motivation: motivation || userDefaults.motivation || 'Viajar',
      dailyGoal,
      todayMinutes: 0,
      studiedMinutes: 0,
      learnedWords: 0,
      streak: 0,
      sessions: [],
      wordProgress: {},
      failedWords: {},
      preferences: {
        notificationsEnabled: false,
        hapticsEnabled: false,
      },
    };
    const account = {
      email: normalizedEmail,
      passwordSalt: salt,
      passwordHash: await hashPassword(password, salt),
      user,
    };

    await storage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
    await storage.setItem(SESSION_KEY, normalizedEmail);
    return user;
  }

  async function login({ email, password }) {
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      throw new Error('Escribe tu correo y contraseña para iniciar sesión.');
    }

    const accounts = await readAccounts();
    const account = accounts.find((savedAccount) => savedAccount.email === normalizedEmail);
    if (!account) {
      throw new Error('No encontramos una cuenta con ese correo. Revisa los datos o crea una cuenta.');
    }

    const submittedHash = await hashPassword(password, account.passwordSalt);
    if (submittedHash !== account.passwordHash) {
      throw new Error('La contraseña no coincide. Revísala e inténtalo de nuevo.');
    }

    await storage.setItem(SESSION_KEY, normalizedEmail);
    const user = hydrateUser(account.user);
    const updatedAccounts = [...accounts];
    updatedAccounts[accounts.indexOf(account)] = { ...account, user };
    await storage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
    return user;
  }

  async function restoreSession() {
    const email = await storage.getItem(SESSION_KEY);
    if (!email) {
      return null;
    }

    const accounts = await readAccounts();
    const account = accounts.find((savedAccount) => savedAccount.email === email);
    if (!account) {
      await storage.removeItem(SESSION_KEY);
      return null;
    }

    const restoredUser = hydrateUser(account.user);
    const updatedAccounts = [...accounts];
    updatedAccounts[accounts.indexOf(account)] = { ...account, user: restoredUser };
    await storage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
    return restoredUser;
  }

  async function updateStoredUser(update) {
    const email = await storage.getItem(SESSION_KEY);
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
    await storage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
    return updatedUser;
  }

  async function logout() {
    await storage.removeItem(SESSION_KEY);
  }

  return { register, login, restoreSession, updateStoredUser, logout };
}