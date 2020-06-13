import React, { createContext, useState, useContext } from "react";

const initialProps = {
  userData: { loggedIn: null, lastLogin: null },
  setUserData: (data) => setUser({ ...userData, userData: data }),
};

const UserContext = createContext(initialProps);

const UserManager = (props) => {
  const { children } = props;
  const [user, setUser] = useState(initialProps.userData);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  return userContext;
};

export default UserManager;
