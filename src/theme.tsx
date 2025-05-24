import { createTheme } from "@mui/material";

export const dayTheme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
      light: '#F1F1F1',
    },
    secondary: {
      main: "#111111",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 720,
      md: 1280,
      lg: 1640,
      xl: 1836,
    },
  },
});