import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import UserManager from "./src/services/UserContext";
import AppNavigator from "./src/navigation";
import axios from "react-native-axios";

const App = () => {
  /*
    Initialise axios
  */

  //axios.defaults.baseURL = "https://api.example.com";
  //axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  //axios.defaults.headers.post["Content-Type"] =
  //  "application/x-www-form-urlencoded";

  return (
    <PaperProvider>
      <UserManager>
        <AppNavigator />
      </UserManager>
    </PaperProvider>
  );
};

export default App;
