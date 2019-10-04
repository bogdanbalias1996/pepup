import { AsyncStorage } from "react-native";

export const _retrieveData = async val => {
  const data = await AsyncStorage.getItem(val);
  return data || null;
};
