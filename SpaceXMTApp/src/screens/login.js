import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { Colors, TextInput, Button, Text } from "react-native-paper";
import Header from "../components/header";
import appConfig from "../config";
import ADMan from "../utilities/AsyncDataManager";
import { useUserContext } from "../services/UserContext";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const passwordInput = useRef();
  const { user, setUser } = useUserContext();
  const [loginError, setLoginError] = useState("");

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

  const login = (username, password) => {
    setLoginError("");
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
              setUser(userData);
              ADMan.setLocalStorage("UserData", userData, finishLogin);
            } else {
              setLoginError("Invalid username or password");
              console.log(json);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    } else if (!username) {
      setLoginError('Please fill in a username');
    } else if (!password) {
      setLoginError('Please fill in a password');
    }
  };

  const finishLogin = (err) => {
    if (err) {
      console.log(err);
      setLoginError("Can't save userdata");
    }
  };

  return (
    <>
      <Header navigation={navigation} iconName="chevron-left" text="Back" />
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput
            mode="outlined"
            style={styles.textInput}
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(text) => setUsername(text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInput.current.focus();
            }}
          />
          <TextInput
            ref={passwordInput}
            mode="outlined"
            style={styles.textInput}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <Button
            style={styles.button}
            mode="outlined"
            onPress={() => {
              login(username, password);
            }}
          >
            Log in
          </Button>
          <Text style={styles.error}>{loginError ? loginError : null}</Text>
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
  error: {
    margin: 20,
    color: Colors.redA700,
  },
});

export default Login;
