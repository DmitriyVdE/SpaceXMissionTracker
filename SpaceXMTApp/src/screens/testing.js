import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import Header from "../components/header";

function Caty(props) {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? "hungry" : "full"}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? "Pour me some milk, please!" : "Thank you!"}
      />
    </View>
  );
}

function Cafe() {
  return (
    <View>
      <Caty name="Munkustrap" />
      <Caty name="Spot" />
    </View>
  );
}

function Cat(props) {
  return (
    <View>
      <Text>I am {props.name}!</Text>
      <Text>I like {props.food}.</Text>
      <Text>I am {props.age} years old.</Text>
    </View>
  );
}

export default function Testscreen({ navigation }) {
  return (
    <>
      <Header iconName="chevron-left" iconSize="40" naviagtion={navigation} />
      <View style={styles.container}>
        <Cafe />

        <Cat name="Maru" food={["fish", "kibble"]} age={2} />

        <Image
          source={{ uri: "https://reactnative.dev/docs/assets/p_cat1.png" }}
          style={{ width: 200, height: 200 }}
        />

        <Text>Open up App.js to start working on your app!</Text>

        <ScrollView
          style={{
            maxHeight: 100,
            margin: 10,
          }}
        >
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Open up App.js to start working on your app!</Text>
        </ScrollView>

        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
