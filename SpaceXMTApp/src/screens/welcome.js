import React, { useEffect } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { Text, Button, Colors } from "react-native-paper";

function Welcome({ navigation }) {
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
          <Text style={styles.mainText}>
            Welcome to the SpaceX Mission Tracker app!
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              mode="outlined"
              onPress={() => navigation.navigate("Login")}
            >
              Log in
            </Button>
            <Button
              style={styles.button}
              mode="outlined"
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Button>
          </View>
        </View>
        <Text style={styles.disclaimer}>
          Disclaimer: This app and it's developer are in no way affiliated with
          SpaceX or it's subsidiaries.
        </Text>
      </View>
    </>
  );
}

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
  buttonContainer: {
    textAlign: "center",
    flexDirection: "row",
    marginBottom: 100,
  },
  button: {
    margin: 10,
    width: "35%",
  },
  disclaimer: {
    bottom: 0,
    textAlign: "center",
    color: Colors.redA700,
  },
});

export default Welcome;
