import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material";

export const mainColor = "#0276aa";
export const secondaryColor = "#19857b";
export const selectedBackground = "#eef8ff";
export const reactIconSize = "0.7em";
export const theme = createTheme({
  palette: {
    primary: {
      main: mainColor,
    },
    secondary: {
      main: secondaryColor,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: "none",
          color: "inherit",
          "&:visited": {
            color: "inherit",
          },
          "&:active": {
            color: "inherit",
          },
          "&:hover": {
            color: "inherit",
          },
        },
        "::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#888",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      },
    },
  },
});
