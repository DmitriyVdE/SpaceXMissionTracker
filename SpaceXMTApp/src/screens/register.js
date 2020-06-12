import React, { useEffect } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { Colors, Button, TextInput } from "react-native-paper";
import Header from "../components/header";

function Register({ navigation }) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <Header navigation={navigation} iconName="chevron-left" iconSize="35" />
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput
            mode="outlined"
            style={styles.textInput}
            placeholder="Username"
          />
          <TextInput
            mode="outlined"
            style={styles.textInput}
            placeholder="E-mail Address"
          />
          <TextInput
            mode="outlined"
            style={styles.textInput}
            placeholder="Password"
          />
          <TextInput
            mode="outlined"
            style={styles.textInput}
            placeholder="Repeat Password"
          />
          <Button
            style={styles.button}
            mode="outlined"
            onPress={() => console.log("logging in")}
          >
            Register
          </Button>
          <Button
            style={styles.button}
            mode="outlined"
            onPress={() => {
              navigation.goBack();
            }}
          >
            Go Back
          </Button>
        </View>
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
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
  },
  textInput: {
    fontSize: 20,
    marginTop: 15,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey100,
    width: "90%",
  },
  button: {
    marginTop: 25,
    width: "90%",
  },
});

export default Register;
