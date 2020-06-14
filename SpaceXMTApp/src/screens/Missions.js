import React, { useEffect } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { Text, Button, Colors } from "react-native-paper";
import { useUserContext } from "../services/UserContext";
import Header from "../components/Header";

const NextLaunch = ({ navigation }) => {
  const { user, setUser } = useUserContext();

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
      <Header navigation={navigation} iconName="chevron-left" text="Back" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.mainText}>Missions</Text>
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

export default NextLaunch;
