import * as React from "react";
import { StyleSheet } from "react-native";
import { Appbar, Button, Colors } from "react-native-paper";

const Header = ({ navigation, iconName, text }) => {
  let headerButton = "";
  if (iconName) {
    headerButton = (
      <Button
        style={styles.button}
        labelStyle={styles.buttonLabel}
        icon={iconName}
        color={Colors.black}
        compact={true}
        onPress={() => navigation.goBack()}
      >
        {text}
      </Button>
    );
  } else {
    headerButton = <Button />;
  }
  return (
    <Appbar.Header style={styles.headerContainer}>{headerButton}</Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    right: 0,
  },
  title: {
    color: "#2E7166",
  },
  button: {
    justifyContent: "center"
  },
  buttonLabel: {
    fontSize: 18
  }
});

export default Header;
