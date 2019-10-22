import AsyncStorage from '@react-native-community/async-storage';

export const _retrieveData = async val => {
  const data = await AsyncStorage.getItem(val);
  return data || null;
};
