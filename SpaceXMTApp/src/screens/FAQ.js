import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, BackHandler } from "react-native";
import { Button } from "react-native-paper";
import { useUserContext } from "../services/UserContext";
import appConfig from "../config";
import Header from "../components/Header";
import FaqCard from "../components/faqCard";

const Faq = ({ navigation }) => {
  const { user, setUser } = useUserContext();
  const [allFaq, setAllFaq] = useState([null]);

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

  useEffect(() => {
    const loadPublicFaq = () => {
      try {
        fetch(appConfig.baseAPIUrl + "faq", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status === 200) {
              setAllFaq(json.result);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    loadPublicFaq();
  }, []);

  const getFaqCards = () => {
    return allFaq.length > 0
      ? allFaq.map((faqInfo) => {
          return (
            <FaqCard
              navigation={navigation}
              faq={faqInfo}
              key={faqInfo ? faqInfo._id.toString() : "0"}
            />
          );
        })
      : null;
  };

  return (
    <>
      <Header navigation={navigation} iconName="chevron-left" text="Back" />
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <Button
            style={styles.button}
            mode="outlined"
            onPress={() => {
              navigation.navigate("AddFAQ");
            }}
          >
            Add FAQ
          </Button>
          {getFaqCards()}
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
  },
  content: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  mainText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default Faq;
