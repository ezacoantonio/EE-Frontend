import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Icon for registration
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config"; // Ensure your config file has the correct endpoint
import CustomSnackbar from "../components/CustomSnackbar";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../styles/textFieldStyles";

export default function RegistrationCard() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "customer", // Set userType to "customer" by default
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State for managing Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info"); // 'success' or 'error'

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setSnackbarMessage("Passwords do not match.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    try {
      await axios.post(config.endpoints.register, formData);
      setSnackbarMessage("Registration successful! Please log in.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration error", error);
      setSnackbarMessage("Registration failed. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
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
            Register
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <ThemeProvider theme={customTheme}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                name="firstName"
                onChange={handleChange}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lastName"
                onChange={handleChange}
              />
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                onChange={handleChange}
              />
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
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                onChange={handleChange}
              />
            </ThemeProvider>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              startIcon={<PersonAddIcon />}
              sx={{ backgroundColor: "green", color: "white" }}
            >
              Register
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                backgroundColor: "#FFE5B4",
                borderRadius: 4,
              }}
            >
              <IconButton onClick={navigateToLogin}>
                <AccountCircleIcon sx={{ color: "orange" }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    alignSelf: "center",
                    color: "black",
                  }}
                >
                  Already have an account? Log in here...
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
