import React, { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import UserManager from "./src/services/UserContext";
import AppNavigator from "./src/navigation";
import axios from "react-native-axios";

function App() {
  const [user, setUser] = useState({
    userData: { loggedIn: false, lastLogin: false },
    setUserData: (data) => setUser({ ...user, userData: data }),
  });
  /*
  1: initialise userContext
  2: load saved data if exists
      - Initialise axios
  3: if (!data) route to welcome.js
  4: if (data) route to home.js
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
}

export default App;
