import * as React from "react";
import { StyleSheet } from "react-native";
import { Appbar, IconButton, Colors } from "react-native-paper";

function Header({ navigation, iconName, iconSize }) {
  let headerButton = "";
  if (iconName) {
    headerButton = (
      <IconButton
        style={styles.close}
        icon={iconName}
        color={Colors.black}
        size={parseInt(iconSize)}
        onPress={() => navigation.goBack()}
      />
    );
  } else {
    headerButton = <IconButton />;
  }
  return (
    <Appbar.Header style={styles.headerContainer}>{headerButton}</Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#FFFFFF",
    right: 0
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#2E7166",
  },
});

export default Header;
