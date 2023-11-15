import AsyncStorage from '@react-native-community/async-storage';

class Storage {
  public static async getItem(key: string) {
    try {
      const res = await AsyncStorage.getItem(key);

      return JSON.parse(res || 'null') as any;
    } catch (e) {
      console.error('Failed to get item from localStorage:', e);
      return null;
    }
  }

  public static async setItem(key: string, value: any) {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to set item to localStorage:', e);
      return null;
    }
  }

  public static async clear(omittedNames?: String[]) {
    try {
      if (!omittedNames) {
        return await AsyncStorage.clear();
      }

      const allKeys = await AsyncStorage.getAllKeys();
      const keysToDelete = allKeys.filter(key => !omittedNames.includes(key));

      await AsyncStorage.multiRemove(keysToDelete);
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
      return null;
    }
  }
}

export default Storage;
