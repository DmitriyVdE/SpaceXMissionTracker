import AsyncStorage from "@react-native-community/async-storage";

const getLocalStorage = async (key, callback) => {
  try {
    return await AsyncStorage.getItem(key, callback);
  } catch (error) {
    console.log(error);
    return false;
  }
}

const setLocalStorage = async (key, value, callback) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue, callback);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const removeLocalStorage = async (key) => {
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
