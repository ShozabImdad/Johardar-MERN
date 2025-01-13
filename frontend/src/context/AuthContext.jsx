import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    authToken: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth.authToken;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        user: parseData.user,
        authToken: parseData.authToken,
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <authContext.Provider value={[auth, setAuth]}>
      {children}
    </authContext.Provider>
  );
};

// custom hook

const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth };
