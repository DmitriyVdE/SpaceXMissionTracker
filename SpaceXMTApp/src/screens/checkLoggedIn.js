import React, { useEffect } from "react";
import { useUserContext } from "../services/UserContext";
import ADMan from "../utilities/AsyncDataManager";
import { StyleSheet, View, Image, ActivityIndicator } from "react-native";
import { Text, Colors } from "react-native-paper";

const checkLoggedIn = ({ navigation }) => {
  const { user, setUser } = useUserContext();

  const fillUserData = (err, res) => {
    if (!err) {
      const values = JSON.parse(res);
      if (values && values.lastLogin != null && values.loggedIn != null) {
        setUser(values);
      } else {
        setUser({ lastLogin: false, loggedIn: false });
      }
    } else {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user.lastLogin === null && user.loggedIn === null) {
      ADMan.getLocalStorage("UserData", fillUserData);
    }
  }, [user]);

  useEffect(() => {
    if (user.loggedIn !== null) {
      if (user.loggedIn) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Welcome");
      }
    }
  }, [user]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            style={styles.logo}
            source={require("../assets/images/spacex.png")}
            resizeMode="contain"
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.logoText}>Mission Tracker</Text>
        </View>
        <Text style={styles.disclaimer}>
          Disclaimer: This app and it's developer are in no way affiliated with
          SpaceX or it's subsidiaries.
        </Text>
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
  logo: {
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined,
  },
  logoText: {
    position: "absolute",
    top: "55%",
    fontWeight: "bold",
    fontSize: 25,
  },
  disclaimer: {
    bottom: 0,
    textAlign: "center",
    color: Colors.redA700,
  },
});

export default checkLoggedIn;
