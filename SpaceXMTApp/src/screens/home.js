import React, { useEffect } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { Text, Button, Colors } from "react-native-paper";

function Home({ navigation }) {
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
        <View style={styles.content}>
          <Text style={styles.mainText}>Home</Text>
        </View>
      </View>
    </>
  );
}

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

export default Home;
