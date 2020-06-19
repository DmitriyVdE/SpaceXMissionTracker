import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, BackHandler } from "react-native";
import { Text } from "react-native-paper";
import { useUserContext } from "../services/UserContext";
import { useAppDataContext } from "../services/AppDataContext";
import ADMan from "../utilities/AsyncDataManager";
import LogoutButton from "../components/LogoutButton";
import CardButton from "../components/CardButton";
import NextLaunchCardButton from "../components/NextLaunchCardButton";

const Home = ({ navigation }) => {
  const { user } = useUserContext();
  const { appData, setApp } = useAppDataContext();

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

  useEffect(() => {
    const loadNextLaunch = (notifications) => {
      try {
        fetch("https://api.spacexdata.com/v3/launches/next", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((json) => {
            setApp({
              nextLaunch: json,
              notifications: notifications
                ? notifications
                : appData.notifications,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    const loadSavedNotifications = (err, res) => {
      if (!err) {
        //loadNextLaunch();
        loadNextLaunch(JSON.parse(res));
      } else {
        loadNextLaunch();
        console.log(err);
      }
    };

    ADMan.getLocalStorage("notifications", loadSavedNotifications);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.userWelcome}>
          Hi {user.userInfo.username}, welcome!
        </Text>
        <ScrollView contentContainerStyle={styles.content}>
          <NextLaunchCardButton
            // Maybe make this a special card with a timer or add it as an optional parameter
            navigation={navigation}
            targetScreen={"NextLaunch"}
            cardTitle={"Next Launch"}
            backgroundImage={require("../assets/images/next_launch.jpg")}
          />
          {/* <CardButton
            navigation={navigation}
            targetScreen={"Launches"}
            cardTitle={"Launches"}
            backgroundImage={require("../assets/images/next_launch.jpg")}
          /> */}
          {/* <CardButton
            navigation={navigation}
            targetScreen={"Missions"}
            cardTitle={"Missions"}
            backgroundImage={require("../assets/images/next_launch.jpg")}
          /> */}
          {/* <CardButton
            navigation={navigation}
            targetScreen={"Ships"}
            cardTitle={"Ships"}
            backgroundImage={require("../assets/images/next_launch.jpg")}
          /> */}
          <CardButton
            navigation={navigation}
            targetScreen={"InfoAndHistory"}
            cardTitle={"Info & History"}
            backgroundImage={require("../assets/images/info_and_history.jpg")}
          />
          <CardButton
            navigation={navigation}
            targetScreen={"FAQ"}
            cardTitle={"FAQ"}
            backgroundImage={require("../assets/images/faq.jpg")}
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
  userWelcome: {
    fontSize: 20,
    lineHeight: 40,
    fontWeight: "bold",
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
