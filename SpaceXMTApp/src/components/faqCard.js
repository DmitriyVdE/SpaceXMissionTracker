import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Colors } from "react-native-paper";

const FaqCard = ({ navigation, faq }) => {
  if (faq) {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      </>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: "auto",
    height: "auto",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
  },
  question: {
    marginBottom: 12,
    lineHeight: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  answer: {
    lineHeight: 16,
    fontSize: 16,
  }
});

export default FaqCard;
