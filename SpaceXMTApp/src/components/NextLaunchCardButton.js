import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Colors } from "react-native-paper";
import { Text } from "react-native-paper";
import CountdownForCard from "../components/CountdownForCard";

const NextLaunchCardButton = ({
  navigation,
  targetScreen,
  cardTitle,
  backgroundImage,
}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate(targetScreen);
        }}
      >
        <ImageBackground
          source={backgroundImage}
          style={styles.imageBackground}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{cardTitle}</Text>
          <CountdownForCard />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    marginTop: 6,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 6,
    width: "100%",
    height: 175,
    position: "relative",
  },
  content: {
    padding: 15,
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  imageBackground: {
    flex: 1,
    alignSelf: "auto",
    height: "100%",
    width: "100%",
    opacity: 0.6,
    position: "absolute",
  },
  title: {
    width: "100%",
    color: Colors.white,
    lineHeight: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default NextLaunchCardButton;
