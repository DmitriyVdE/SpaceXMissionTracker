import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "react-native-paper";
import { Text } from "react-native-paper";
import { useAppDataContext } from "../services/AppDataContext";
import moment from "moment";
import "moment/locale/be";

const CountdownForCard = () => {
  const { appData } = useAppDataContext();
  const [days, setDays] = useState(undefined);
  const [hours, setHours] = useState(undefined);
  const [minutes, setMinutes] = useState(undefined);
  const [seconds, setSeconds] = useState(undefined);
  const launchDateTime = appData.nextLaunch
    ? moment(appData.nextLaunch.launch_date_utc)
    : null;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      moment.locale("be");
      if (launchDateTime) {
        const countdown = moment(launchDateTime - now);
        setDays(countdown.format("DD"));
        setHours(countdown.format("HH"));
        setMinutes(countdown.format("mm"));
        setSeconds(countdown.format("ss"));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [appData]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{days ? days + " day" + (days > 1 || days < 1 ? "s" : "") : " "}</Text>
      <Text style={styles.timer}>{hours ? hours + " hour" + (hours > 1 || hours < 1 ? "s" : "") : " "}</Text>
      <Text style={styles.timer}>{minutes ? minutes + " minute" + (minutes > 1 || minutes < 1 ? "s" : "") : " "}</Text>
      <Text style={styles.timer}>{seconds ? seconds + " second" + (seconds > 1 || seconds < 1 ? "s" : "") : " "}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  timer: {
    alignSelf: "baseline",
    color: Colors.white,
    lineHeight: 24,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CountdownForCard;
