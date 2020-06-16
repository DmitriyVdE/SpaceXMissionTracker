import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CheckLoggedIn from "../screens/CheckLoggedIn";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import NextLaunch from "../screens/NextLaunch";
import Launches from "../screens/Launches";
import Missions from "../screens/Missions";
import Ships from "../screens/Ships";
import InfoAndHistory from "../screens/InfoAndHistory";
import FAQ from "../screens/FAQ";
import AddFAQ from "../screens/AddFAQ";

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
    NextLaunch: {
      screen: NextLaunch,
    },
    Launches: {
      screen: Launches,
    },
    Missions: {
      screen: Missions,
    },
    Ships: {
      screen: Ships,
    },
    InfoAndHistory: {
      screen: InfoAndHistory,
    },
    FAQ: {
      screen: FAQ,
    },
    AddFAQ: {
      screen: AddFAQ,
    },
  },
  {
    initialRouteName: "CheckLoggedIn",
    headerMode: "none",
    mode: "modal",
  }
);

export default createAppContainer(StackNavigator);
