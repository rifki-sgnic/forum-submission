import { createTheme, alpha } from "@mui/material/styles";

const colorPresets = {
  purple: {
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#f97316",
      light: "#fb923c",
      dark: "#ea580c",
    },
  },
  blue: {
    primary: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1d4ed8",
    },
    secondary: {
      main: "#06b6d4",
      light: "#22d3ee",
      dark: "#0891b2",
    },
  },
  green: {
    primary: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    secondary: {
      main: "#84cc16", // Lime
      light: "#a3e635",
      dark: "#65a30d",
    },
  },
};

function createAppTheme(mode, color = "purple") {
  const selectedColors = colorPresets[color] || colorPresets.purple;

  const colors = {
    ...selectedColors,
    upvote: "#f97316",
    downvote: "#8b5cf6",
  };

  return createTheme({
    palette: {
      mode,
      primary: colors.primary,
      secondary: colors.secondary,
      background: {
        default: mode === "light" ? "#f8fafc" : "#0a0a0f",
        paper: mode === "light" ? "#ffffff" : "#16161f",
      },
      text: {
        primary: mode === "light" ? "#0f172a" : "#f1f5f9",
        secondary: mode === "light" ? "#64748b" : "#94a3b8",
      },
      divider:
        mode === "light" ? alpha("#64748b", 0.12) : alpha("#94a3b8", 0.12),
      success: {
        main: "#10b981",
      },
      error: {
        main: "#ef4444",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
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
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === "light" ? "#f8fafc" : "#0a0a0f",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: "10px 20px",
            boxShadow: "none",
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow:
                mode === "light"
                  ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                  : "0 4px 12px rgba(0, 0, 0, 0.3)",
              transform: "translateY(-1px)",
            },
          },
          contained: {
            "&:hover": {
              boxShadow: `0 4px 12px ${alpha(colors.primary.main, 0.3)}`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: mode === "light" ? "#ffffff" : "#16161f",
            border: `1px solid ${
              mode === "light" ? alpha("#64748b", 0.1) : alpha("#94a3b8", 0.1)
            }`,
            boxShadow:
              mode === "light"
                ? "0 1px 3px rgba(0, 0, 0, 0.05)"
                : "0 1px 3px rgba(0, 0, 0, 0.2)",
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow:
                mode === "light"
                  ? "0 4px 12px rgba(0, 0, 0, 0.08)"
                  : "0 4px 12px rgba(0, 0, 0, 0.3)",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background:
              mode === "light"
                ? "rgba(255, 255, 255, 0.9)"
                : "rgba(10, 10, 15, 0.9)",
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${
              mode === "light" ? alpha("#64748b", 0.1) : alpha("#94a3b8", 0.1)
            }`,
            boxShadow: "none",
            color: mode === "light" ? "#0f172a" : "#f1f5f9",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            transition: "all 0.2s ease",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 10,
              "& fieldset": {
                borderColor:
                  mode === "light"
                    ? alpha("#64748b", 0.2)
                    : alpha("#94a3b8", 0.2),
              },
              "&:hover fieldset": {
                borderColor: colors.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.primary.main,
              },
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: mode === "light" ? "#ffffff" : "#16161f",
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "&.Mui-selected": {
              background: alpha(colors.primary.main, 0.1),
              color: colors.primary.main,
              "&:hover": {
                background: alpha(colors.primary.main, 0.15),
              },
            },
          },
        },
      },
    },
  });
}

export default createAppTheme;
