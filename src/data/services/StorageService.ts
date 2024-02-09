import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '../../utils/AppError';

export const StorageService = {
  async getItem(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e: any) {
      throw new AppError(e.message);
    }
  },

  async setItem(key: string, item: string) {
    try {
      return await AsyncStorage.setItem(key, item);
    } catch (e: any) {
      throw new AppError(e.message);
    }
  },
};
