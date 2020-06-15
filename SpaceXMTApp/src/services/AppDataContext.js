import React, { createContext, useState, useContext } from "react";

const initialProps = {
  appData: { nextLaunch: null, notifications: [] },
  setAppData: (data) => setApp({ ...appData, appData: data }),
};

const AppDataContext = createContext(initialProps);

const AppDataManager = (props) => {
  const { children } = props;
  const [appData, setApp] = useState(initialProps.appData);

  return (
    <AppDataContext.Provider value={{ appData, setApp }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataContext = () => {
  const appDataContext = useContext(AppDataContext);
  return appDataContext;
};

export default AppDataManager;
