import { createTheme } from "@mui/material/styles";

const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#2563eb", // Modern Blue
      },
      secondary: {
        main: "#ec4899", // Pink accent
      },
      background: {
        default: mode === "light" ? "#f8fafc" : "#0f172a",
        paper: mode === "light" ? "#ffffff" : "#1e293b",
      },
      text: {
        primary: mode === "light" ? "#1e293b" : "#f1f5f9",
        secondary: mode === "light" ? "#64748b" : "#94a3b8",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h6: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 800,
        color: mode === "light" ? "#0f172a" : "#f1f5f9",
      },
      button: {
        fontWeight: 600,
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: "none",
            "&:hover": {
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === "light"
                ? "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
                : "0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                mode === "light"
                  ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                  : "0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background:
              mode === "light"
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(8px)",
            boxShadow:
              mode === "light"
                ? "inset 0 -1px 0 0 #e2e8f0"
                : "inset 0 -1px 0 0 #334155",
            color: mode === "light" ? "#0f172a" : "#f1f5f9",
          },
        },
      },
    },
  });

export default createAppTheme;
