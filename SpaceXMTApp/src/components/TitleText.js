import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "react-native-paper";

const TitleText = ({ title, text, textSize }) => {
  let textStyle;
  if (textSize === "large") {
    textStyle = StyleSheet.create({
      text: {
        width: "100%",
        color: Colors.black,
        fontSize: 22,
        lineHeight: 24,
        fontWeight: "bold",
      },
    });
  } else if (textSize === "small") {
    textStyle = StyleSheet.create({
      text: {
        width: "100%",
        color: Colors.black,
        fontSize: 18,
        lineHeight: 20,
      },
    });
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={textStyle.text}>{text}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: 10,
  },
  title: {
    width: "100%",
    color: Colors.black,
    fontSize: 16,
    fontWeight: "100",
  },
});

export default TitleText;
