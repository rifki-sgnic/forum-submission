import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileDrawer from "./MobileDrawer";
import SettingsDrawer from "./SettingsDrawer";

function Navigation({ authUser, onSignOut }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  function toggleSettingsDrawer(open) {
    return function (event) {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setSettingsOpen(open);
    };
  }

  function toggleMobileMenu(open) {
    return function (event) {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setMobileMenuOpen(open);
    };
  }

  const navigationMenus = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Leaderboard", href: "/leaderboard" },
  ];

  function isActive(href) {
    return location.pathname === href;
  }

  function onLogout() {
    if (authUser) onSignOut();
  }

  function NavButton({ menu }) {
    return (
      <Button
        color="inherit"
        component={Link}
        to={menu.href}
        sx={{
          px: 2,
          py: 1,
          borderRadius: 2,
          fontWeight: 600,
          color: isActive(menu.href) ? "primary.main" : "text.secondary",
          background: isActive(menu.href)
            ? alpha(theme.palette.primary.main, 0.1)
            : "transparent",
          "&:hover": {
            background: alpha(theme.palette.primary.main, 0.08),
            color: "primary.main",
          },
        }}
      >
        {menu.label}
      </Button>
    );
  }

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 1 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={toggleMobileMenu(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                }}
              >
                <RocketLaunchIcon sx={{ color: "#fff", fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: { xs: "none", sm: "flex" },
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                THREADS
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 0.5, ml: 4 }}>
                {navigationMenus.map((menu) => (
                  <NavButton key={menu.id} menu={menu} />
                ))}
              </Box>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {authUser && !isMobile && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ borderRadius: 2 }}
                  onClick={() => navigate("/new")}
                >
                  New Thread
                </Button>
              )}

              {!isMobile && (
                <Button
                  color={authUser ? "inherit" : "primary"}
                  variant={authUser ? "text" : "outlined"}
                  component={Link}
                  to={authUser ? "/" : "/login"}
                  onClick={onLogout}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    fontWeight: 600,
                  }}
                >
                  {authUser ? "Logout" : "Login"}
                </Button>
              )}

              <IconButton
                onClick={toggleSettingsDrawer(true)}
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "primary.main",
                    background: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {authUser && isMobile && location.pathname !== "/new" && (
        <Fab
          color="primary"
          onClick={() => navigate("/new")}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
          }}
        >
          <AddIcon />
        </Fab>
      )}

      <MobileDrawer
        open={mobileMenuOpen}
        onClose={toggleMobileMenu(false)}
        authUser={authUser}
        onSignOut={onSignOut}
      />
      <SettingsDrawer
        open={settingsOpen}
        onClose={toggleSettingsDrawer(false)}
      />
    </>
  );
}

export default Navigation;
