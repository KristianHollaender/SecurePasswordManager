import {createTheme} from "@mui/material/styles";

export const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4facc3",
    },
    secondary: {
      main: "#282c2c",
    },
    error: {
      main: "#c74059",
    },
    background: {
      default: "#041a28",
      paper: "#161818",
    },
    info: {
      main: "#383f3f",
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#041a28",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      html, body, #root {
        height: 100%;
        margin: 0;
        background: linear-gradient(to left, #000000, #0a3d62);
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
      }
      `,
    },
  },
});