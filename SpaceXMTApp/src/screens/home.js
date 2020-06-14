import React, { useEffect } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { Text, Button, Colors } from "react-native-paper";
import { useUserContext } from "../services/UserContext";
import ADMan from "../utilities/AsyncDataManager";

const Home = ({ navigation }) => {
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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        BackHandler.exitApp();
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.mainText}>Home</Text>
          <Button
            style={styles.button}
            mode="outlined"
            onPress={() => {
              console.log('logout');
              logout();
            }}
          >
            Log out
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  mainText: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Home;
