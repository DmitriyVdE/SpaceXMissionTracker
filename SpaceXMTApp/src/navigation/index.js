import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CheckLoggedIn from "../screens/checkLoggedIn";
import Welcome from "../screens/welcome";
import Login from "../screens/login";
import Register from "../screens/register";
import Home from "../screens/home";

const StackNavigator = createStackNavigator(
  {
    CheckLoggedIn: {
      screen: CheckLoggedIn,
    },
    Welcome: {
      screen: Welcome,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    Home: {
      screen: Home,
    },
  },
  {
    initialRouteName: "CheckLoggedIn",
    headerMode: "none",
    mode: "modal",
  }
);

export default createAppContainer(StackNavigator);
