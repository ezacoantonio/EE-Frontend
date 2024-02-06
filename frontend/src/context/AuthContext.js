// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Placeholder for auth check logic
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const login = (userDetails) => {
    // Assuming userDetails includes a 'role' property
    setCurrentUser(userDetails);
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    // Redirect or update UI accordingly
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
