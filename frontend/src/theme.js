import { createTheme } from "@mui/material/styles";

// Create a mobile-first dark theme for the Score Keeper app
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      dark: "#5d99c6",
      light: "#a6d4fa",
    },
    secondary: {
      main: "#f48fb1",
      dark: "#bf5f82",
      light: "#f6a5c0",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    surface: {
      main: "#2a2a2a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
    divider: "#424242",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      "@media (max-width:600px)": {
        fontSize: "1.1rem",
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.1rem",
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    body1: {
      fontSize: "1rem",
      "@media (max-width:600px)": {
        fontSize: "0.9rem",
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
            width: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          backgroundImage: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          borderTop: "1px solid #424242",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.3)",
          height: 64,
          "@media (max-width:600px)": {
            height: 56,
          },
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#b3b3b3",
          "&.Mui-selected": {
            color: "#90caf9",
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: "0.75rem",
            "@media (max-width:600px)": {
              fontSize: "0.7rem",
            },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 48,
          background: "background.paper",
          borderBottom: "2px solid #424242",
          borderRadius: 0,
          boxShadow: "none",
          position: "relative",
          zIndex: 2,
          "@media (max-width:600px)": {
            minHeight: 40,
          },
        },
        indicator: {
          backgroundColor: "#90caf9",
          height: 3,
          borderRadius: 2,
          boxShadow: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
          padding: "8px 16px",
          fontSize: "1rem",
          fontWeight: 600,
          textTransform: "none",
          letterSpacing: 0.5,
          borderRadius: 6,
          margin: "0 2px",
          color: "#b3b3b3",
          background: "none",
          transition: "background 0.2s, color 0.2s",
          "&.Mui-selected": {
            background: "rgba(144,202,249,0.12)",
            color: "#90caf9",
            boxShadow: "none",
          },
          "&:hover": {
            background: "rgba(144,202,249,0.08)",
            color: "#90caf9",
          },
          "@media (max-width:600px)": {
            minHeight: 40,
            padding: "6px 8px",
            fontSize: "0.92rem",
            borderRadius: 4,
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#2a2a2a",
          borderRadius: 8,
          marginBottom: 8,
          "&:hover": {
            backgroundColor: "#333333",
          },
          "@media (max-width:600px)": {
            paddingLeft: 8,
            paddingRight: 8,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          "@media (max-width:600px)": {
            minWidth: 64,
            padding: "8px 16px",
          },
        },
        contained: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#90caf9",
          "@media (max-width:600px)": {
            padding: 8,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#2a2a2a",
            borderRadius: 8,
            "& fieldset": {
              borderColor: "#424242",
            },
            "&:hover fieldset": {
              borderColor: "#90caf9",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#90caf9",
            },
          },
          "@media (max-width:600px)": {
            margin: 4,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1e1e1e",
          borderRadius: 12,
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          "@media (max-width:600px)": {
            left: 8,
            right: 8,
            bottom: 72, // Account for bottom navigation
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
