import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, BackHandler } from "react-native";
import { Button } from "react-native-paper";
import { useAppDataContext } from "../services/AppDataContext";
import {
  askPermissions,
  sendNotificationImmediately,
  scheduleNotification,
  cancelAllScheduledNotifications,
} from "../services/Notifications";
import ADMan from "../utilities/AsyncDataManager";
import Header from "../components/Header";
import TitleText from "../components/TitleText";
import moment from "moment";

const NextLaunch = ({ navigation }) => {
  const { appData, setApp } = useAppDataContext();
  const launchDateTime = appData.nextLaunch
    ? moment(appData.nextLaunch.launch_date_utc)
    : null;

  const isCorrectFlightNumber = (notification) => {
    if (notification.flight_number === appData.nextLaunch.flight_number) {
      return true;
    }
  };

  const setNotification = appData.notifications
    ? appData.notifications.find(isCorrectFlightNumber)
    : null;

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

  const setupNotification = () => {
    askPermissions(setNextLaunchNotification);
  };

  const setNextLaunchNotification = (res) => {
    if (res) {
      console.log(res);
      sendNotificationImmediately(
        "Test",
        "Something to fill the body with",
        //launchDateTime,
        saveNotificationId
      );
      //console.log(res);
    } else {
      console.log(res);
      // Add toast to notify user to enable notifications
    }
  };

  const saveNotificationId = (res) => {
    if (res !== false) {
      let newNotifications = appData.notifications;
      newNotifications.push({
        flight_number: appData.nextLaunch.flight_number,
        notificationId: res,
      });
      const newAppData = {
        nextLaunch: appData.nextLaunch,
        notifications: newNotifications,
      };
      setApp(newAppData);
      ADMan.setLocalStorage(
        "notifications",
        newNotifications,
        finishSavingNotification
      );
    }
  };

  const finishSavingNotification = (err) => {
    if (err) {
      console.log(err);
    }
  };

  const removeNextLaunchNotification = () => {
    const newAppData = {
      nextLaunch: appData.nextLaunch,
      notifications: [],
    };
    setApp(newAppData);
    ADMan.setLocalStorage("notifications", [], finishRemovingNotification);
  };

  const finishRemovingNotification = (err) => {
    if (!err) {
      cancelAllScheduledNotifications();
    } else {
      console.log("Could not remove notification");
    }
  };

  const notificationButton = () => {
    if (setNotification) {
      return (
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => {
            removeNextLaunchNotification();
          }}
        >
          You'll be notified
        </Button>
      );
    } else {
      return (
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => {
            setupNotification();
          }}
        >
          Notify Me
        </Button>
      );
    }
  };

  return (
    <>
      <Header navigation={navigation} iconName="chevron-left" text="Back" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {notificationButton()}
          <Button
            style={styles.button}
            mode="outlined"
            onPress={() => {
              sendNotificationImmediately("Instant notification", "You just triggered this instant notification, cool huh?");
            }}
          >
            DEMO INSTANT
          </Button>
          <Button
            style={styles.button}
            mode="outlined"
            onPress={() => {
              scheduleNotification("Delayed notification", "You triggered this notification exactly 6 seconds ago.", new Date().getTime() + 6000);
            }}
          >
            DEMO 6 SECONDS
          </Button>
          <TitleText
            title={"Flight number"}
            text={appData.nextLaunch ? appData.nextLaunch.flight_number : " "}
            textSize="large"
          />
          <TitleText
            title={"Mission Name"}
            text={appData.nextLaunch ? appData.nextLaunch.mission_name : " "}
            textSize="large"
          />
          <TitleText
            title={"Details"}
            text={appData.nextLaunch ? appData.nextLaunch.details : " "}
            textSize="small"
          />
          <TitleText
            title={"Rocket"}
            text={
              appData.nextLaunch ? appData.nextLaunch.rocket.rocket_name : " "
            }
            textSize="large"
          />
          <TitleText
            title={"Launch Date"}
            text={
              launchDateTime !== null
                ? launchDateTime.format("DD/MM/YYYY")
                : " "
            }
            textSize="large"
          />
          <TitleText
            title={"Launch Time"}
            text={
              launchDateTime !== null ? launchDateTime.format("HH:mm:ss") : " "
            }
            textSize="large"
          />
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
    flex: 1,
    fontSize: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default NextLaunch;
