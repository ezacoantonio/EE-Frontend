// src/styles/textFieldStyles.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "black", // Change outline color when focused
            },
          },
          "& .MuiInputLabel-root": {
            // Target label
            color: "rgba(0, 0, 0, 0.6)", // Default state color
            "&.Mui-focused": {
              color: "black", // Change label text color when focused
            },
          },
        },
      },
    },
  },
});

export default theme;
