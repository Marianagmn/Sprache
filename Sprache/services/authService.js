import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { createAuthService } from './authServiceCore.js';

const authService = createAuthService({ storage: AsyncStorage, crypto: Crypto });

export const {
  register,
  login,
  restoreSession,
  updateStoredUser,
  logout,
} = authService;