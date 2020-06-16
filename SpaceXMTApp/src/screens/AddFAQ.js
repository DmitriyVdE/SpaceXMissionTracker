import React, { useEffect, useState } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { Colors, TextInput, Button, Text } from "react-native-paper";
import Header from "../components/Header";
import appConfig from "../config";
import { useUserContext } from "../services/UserContext";

const AddFAQ = ({ navigation }) => {
  const { user } = useUserContext();
  const [question, setQuestion] = useState("");
  const [addFAQError, setAddFAQError] = useState("");

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

  const addFaq = (username) => {
    setAddFAQError("");
    if (username) {
      try {
        fetch(appConfig.baseAPIUrl + "/faq/create", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + user.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status === 201) {
              navigation.goBack();
            } else {
              setAddFAQError("Invalid question or unauthorised.");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    } else if (!question) {
      setAddFAQError("Please enter a question");
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
            placeholder="Question"
            autoCapitalize="none"
            onChangeText={(text) => setQuestion(text)}
            multiline={true}
          />
          <Button
            style={styles.button}
            mode="outlined"
            onPress={() => {
              addFaq(question);
            }}
          >
            Submit
          </Button>
          <Text style={styles.error}>{addFAQError ? addFAQError : null}</Text>
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
    // MAYBE CHANGE THIS LATER -> Top bar interference or overlaying
    paddingVertical: 10,
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

export default AddFAQ;
