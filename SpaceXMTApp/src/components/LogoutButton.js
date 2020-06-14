import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useUserContext } from "../services/UserContext";
import ADMan from "../utilities/AsyncDataManager";

const LogoutButton = ({ navigation }) => {
  const { user, setUser } = useUserContext();

  const logout = () => {
    const userData = { lastLogin: null, loggedIn: null, token: null, userInfo: null };
    setUser(userData);
    ADMan.setLocalStorage("UserData", userData, finishLogout);
  };

  const finishLogout = (err) => {
    if (!err) {
      navigation.navigate("CheckLoggedIn");
    } else {
      console.log(err);
    }
  }

  return (
    <>
      <Button
        style={styles.button}
        mode="outlined"
        onPress={() => {
          logout();
        }}
      >
        Log out
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 0,
  },
});

export default LogoutButton;
