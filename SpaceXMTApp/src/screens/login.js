import React, { useEffect } from "react";
import { StyleSheet, View, AsyncStorage, BackHandler } from "react-native";
import { Colors, TextInput, Button } from "react-native-paper";
import Header from "../components/header";
import appConfig from "../config";

function Login({ navigation }) {
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

  function login(username, password) {
    console.log(username, password);
    if (username && password) {
      try {
        fetch(appConfig.baseAPIUrl + "login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status === 200) {
              const userData = {
                userInfo: json.result,
                token: json.token,
                loggedIn: true,
                lastLogin: Date.now(),
              };
              setLocalStorage("UserData", JSON.stringify(userData));
              navigation.navigate("Home");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function setLocalStorage(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header navigation={navigation} iconName="chevron-left" iconSize="35" />
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput
            name="username"
            mode="outlined"
            style={styles.textInput}
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(text) => (this.loginUserName = text)}
          />
          <TextInput
            name="password"
            mode="outlined"
            style={styles.textInput}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => (this.loginPassword = text)}
          />
          <Button
            style={styles.button}
            mode="outlined"
            onPress={() => {
              login(this.loginUserName, this.loginPassword);
            }}
          >
            Log in
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
  },
  textInput: {
    fontSize: 20,
    marginTop: 15,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey300,
    width: "90%",
  },
  button: {
    marginTop: 25,
    width: "90%",
  },
});

export default Login;
