import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsDrawer from "./SettingsDrawer";

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              mr: 2,
            }}
          >
            <RocketLaunchIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "primary.main",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
              }}
            >
              THREADS
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button color="primary" variant="text" component={Link} to="/">
              Home
            </Button>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <IconButton onClick={toggleDrawer(true)} color="primary">
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <SettingsDrawer open={drawerOpen} onClose={toggleDrawer(false)} />
    </AppBar>
  );
};

export default Navigation;
