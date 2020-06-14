import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, BackHandler } from "react-native";
import { Text, Button, Colors } from "react-native-paper";
import { useUserContext } from "../services/UserContext";
import LogoutButton from "../components/LogoutButton";
import CardButton from "../components/CardButton";

const Home = ({ navigation }) => {
  const { user, setUser } = useUserContext();

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
        <ScrollView contentContainerStyle={styles.content}>
          <CardButton
          // Maybe make this a special card with a timer or add it as an optional parameter
            navigation={navigation}
            targetScreen={"NextLaunch"}
            cardTitle={"Next Launch"}
            backgroundImage={require("../assets/images/next_launch.jpg")}
          />
          <CardButton
            navigation={navigation}
            targetScreen={"Launches"}
            cardTitle={"Launches"}
            backgroundImage={require("../assets/images/next_launch.jpg")}
          />
          <CardButton
            navigation={navigation}
            targetScreen={"Missions"}
            cardTitle={"Missions"}
            backgroundImage={require("../assets/images/next_launch.jpg")}
          />
          <CardButton
            navigation={navigation}
            targetScreen={"Ships"}
            cardTitle={"Ships"}
            backgroundImage={require("../assets/images/next_launch.jpg")}
          />
          <CardButton
            navigation={navigation}
            targetScreen={"InfoAndHistory"}
            cardTitle={"Info & History"}
            backgroundImage={require("../assets/images/next_launch.jpg")}
          />
          <CardButton
            navigation={navigation}
            targetScreen={"FAQ"}
            cardTitle={"FAQ"}
            backgroundImage={require("../assets/images/next_launch.jpg")}
          />
          <LogoutButton navigation={navigation} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 25,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  content: {
    paddingBottom: 10,
  },
  mainText: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Home;
