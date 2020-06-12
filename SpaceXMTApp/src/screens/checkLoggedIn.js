import * as React from "react";
//import UserContext from "../services/UserContext";
import { StyleSheet, View, Image, ActivityIndicator, BackHandler } from "react-native";
import { Text, Colors } from "react-native-paper";

export default class checkLoggedIn extends React.Component {
  //static contextType = UserContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const user = this.context;
    setTimeout(() => { {user.loggedIn ? this.props.navigation.navigate("Home") : this.props.navigation.navigate("Welcome")}; }, 1000);
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image
              style={styles.logo}
              source={require("../assets/images/spacex.png")}
              resizeMode="contain"
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={styles.logoText}>Mission Tracker</Text>
          </View>
          <Text style={styles.disclaimer}>
            Disclaimer: This app and it's developer are in no way affiliated
            with SpaceX or it's subsidiaries.
          </Text>
        </View>
      </>
    );
  }
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
  logo: {
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined,
  },
  logoText: {
    position: "absolute",
    top: "55%",
    fontWeight: "bold",
    fontSize: 25,
  },
  disclaimer: {
    bottom: 0,
    textAlign: "center",
    color: Colors.redA700,
  },
});
