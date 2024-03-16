// AlertContext.js
import React, { createContext, useContext, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const triggerAlert = (message, severity = "info") => {
    setAlert({ open: true, message, severity });
    setTimeout(
      () => setAlert({ open: false, message: "", severity: "" }),
      4000
    ); // Auto-hide after 4 seconds
  };

  return (
    <AlertContext.Provider value={triggerAlert}>
      {children}
      {alert.open && (
        <Stack
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
          spacing={2}
        >
          <Alert variant="filled" severity={alert.severity}>
            {alert.message}
          </Alert>
        </Stack>
      )}
    </AlertContext.Provider>
  );
};
