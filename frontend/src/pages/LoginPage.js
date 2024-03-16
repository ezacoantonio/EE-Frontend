// LoginPage.js

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import CustomSnackbar from "../components/CustomSnackbar";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../styles/textFieldStyles";
import { useTheme } from "@mui/material/styles";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(config.endpoints.login, formData);
      // Assuming the response includes user role
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Adjust according to actual response
      navigate(
        response.data.user.role === "client"
          ? "/client-dashboard"
          : "/company-dashboard"
      );
    } catch (error) {
      setSnackbarMessage("Login failed. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Card
        sx={{
          width: isMobile ? "90%" : 500,
          maxWidth: "100%",
          border: "1px solid black",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              mb: 2,
              textAlign: "center",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Log In
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <ThemeProvider theme={customTheme}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                name="email"
                onChange={handleChange}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                name="password"
                onChange={handleChange}
              />
            </ThemeProvider>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              startIcon={<LockOpenIcon />}
              sx={{ backgroundColor: "black", color: "white" }}
            >
              Log In
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                backgroundColor: "silver",
                borderRadius: 4,
              }}
            >
              <IconButton onClick={navigateToRegister}>
                <AccountCircleIcon sx={{ color: "black", marginRight: 1 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ alignSelf: "center", color: "black" }}
                >
                  Don't have an account? Register here
                </Typography>
              </IconButton>
            </Box>
          </form>
        </CardContent>
      </Card>
      <CustomSnackbar
        open={openSnackbar}
        handleClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
}
