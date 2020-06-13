import { AsyncStorage } from "react-native";

async function getLocalStorage(key, callback) {
  try {
    const value = await AsyncStorage.getItem(key, callback);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function setLocalStorage(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function removeLocalStorage(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
};
