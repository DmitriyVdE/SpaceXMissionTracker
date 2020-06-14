import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView, BackHandler } from "react-native";
import { Colors, TextInput, Button, Text } from "react-native-paper";
import Header from "../components/header";
import { useUserContext } from "../services/UserContext";
import appConfig from "../config";
import ADMan from "../utilities/AsyncDataManager";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [email, setEmail] = useState("");
  const emailInput = useRef();
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const passwordInput = useRef();
  const [passwordError, setPasswordError] = useState("");

  const [repeatPassword, setRepeatPassword] = useState("");
  const repeatPasswordInput = useRef();
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const [firstname, setFirstname] = useState("");
  const firstnameInput = useRef();

  const [lastname, setLastname] = useState("");
  const lastnameInput = useRef();

  const { user, setUser } = useUserContext();
  const [registerError, setRegisterError] = useState("");

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

  const register = (
    username,
    email,
    password,
    repeatPassword,
    firstname,
    lastname
  ) => {
    setRegisterError("");
    if (
      username &&
      email &&
      password &&
      repeatPassword &&
      password === repeatPassword
    ) {
      try {
        fetch(appConfig.baseAPIUrl + "register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status === 201) {
              const userData = {
                userInfo: json.result,
                token: json.token,
                loggedIn: true,
                lastLogin: Date.now(),
              };
              setUser(userData);
              ADMan.setLocalStorage("UserData", userData, finishRegister);
            } else {
              setRegisterError("Username taken or the provided e-mail address has already been used");
              console.log(json);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const finishRegister = (err) => {
    if (err) {
      console.log(err);
      setRegisterError("Can't save userdata");
    }
  };

  return (
    <>
      <Header navigation={navigation} iconName="chevron-left" text="Back" />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            {registerError != "" ? (
              <Text style={styles.error}>
                {registerError ? registerError : null}
              </Text>
            ) : null}
            <TextInput
              mode="outlined"
              style={styles.textInput}
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={(text) => {
                const usernameRegex = new RegExp(/^[A-Za-z0-9_.]{4,}$/);
                if (usernameRegex.test(text)) {
                  setUsername(text);
                  setUsernameError("");
                } else {
                  setUsername(null);
                  setUsernameError("Invalid username");
                }
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInput.current.focus();
              }}
            />
            {usernameError != "" ? (
              <Text style={styles.error}>
                {usernameError ? usernameError : null}
              </Text>
            ) : null}
            <TextInput
              ref={emailInput}
              mode="outlined"
              style={styles.textInput}
              placeholder="E-mail Address"
              autoCapitalize="none"
              onChangeText={(text) => {
                const emailRegex = new RegExp(
                  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                );
                if (emailRegex.test(text)) {
                  setEmail(text);
                  setEmailError("");
                } else {
                  setEmail(null);
                  setEmailError("Invalid e-mail address");
                }
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInput.current.focus();
              }}
            />
            {emailError != "" ? (
              <Text style={styles.error}>{emailError ? emailError : null}</Text>
            ) : null}
            <TextInput
              ref={passwordInput}
              mode="outlined"
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text) => {
                const passwordRegex = new RegExp(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/
                );
                if (passwordRegex.test(text)) {
                  setPassword(text);
                  setPasswordError("");
                } else {
                  setPassword(null);
                  setPasswordError("Invalid password");
                }
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                repeatPasswordInput.current.focus();
              }}
            />
            {passwordError != "" ? (
              <Text style={styles.error}>
                {passwordError ? passwordError : null}
              </Text>
            ) : null}
            <TextInput
              ref={repeatPasswordInput}
              mode="outlined"
              style={styles.textInput}
              placeholder="Repeat Password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text) => {
                if (password === text) {
                  setRepeatPassword(text);
                  setRepeatPasswordError("");
                } else {
                  setRepeatPassword(null);
                  setRepeatPasswordError("Invalid password");
                }
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                firstnameInput.current.focus();
              }}
            />
            {repeatPasswordError != "" ? (
              <Text style={styles.error}>
                {repeatPasswordError ? repeatPasswordError : null}
              </Text>
            ) : null}
            <TextInput
              ref={firstnameInput}
              mode="outlined"
              style={styles.textInput}
              placeholder="Firstname (Optional)"
              autoCapitalize="none"
              onChangeText={(text) => setFirstname(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                lastnameInput.current.focus();
              }}
            />
            <TextInput
              ref={lastnameInput}
              mode="outlined"
              style={styles.textInput}
              placeholder="Lastname (Optional)"
              autoCapitalize="none"
              onChangeText={(text) => setLastname(text)}
            />
            <Button
              style={styles.button}
              mode="outlined"
              onPress={() =>
                register(
                  username,
                  email,
                  password,
                  repeatPassword,
                  firstname,
                  lastname
                )
              }
            >
              Register
            </Button>
          </View>
        </ScrollView>
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
  error: {
    marginTop: 10,
    color: Colors.redA700,
  },
});

export default Register;
