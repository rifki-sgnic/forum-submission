import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function MobileDrawer({ open, onClose, authUser, onSignOut }) {
  const theme = useTheme();
  const location = useLocation();

  const navigationMenus = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Leaderboard", href: "/leaderboard" },
  ];

  function isActive(href) {
    return location.pathname === href;
  }

  function handleLogout() {
    if (authUser) onSignOut();
    onClose();
  }

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280, pt: 3, height: "100%" }} role="presentation">
        {/* Header */}
        <Box
          sx={{
            px: 3,
            pb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: "primary.main",
            }}
          >
            <RocketLaunchIcon sx={{ color: "#fff", fontSize: 20 }} />
          </Box>
          <Typography variant="h6" fontWeight={700} letterSpacing={0.5}>
            THREADS
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Navigation List */}
        <List sx={{ px: 2 }}>
          {navigationMenus.map((menu) => (
            <ListItem key={menu.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={menu.href}
                onClick={onClose}
                selected={isActive(menu.href)}
                sx={{
                  borderRadius: 2,
                  "&.Mui-selected": {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                    },
                  },
                }}
              >
                <ListItemText
                  primary={menu.label}
                  primaryTypographyProps={{
                    fontWeight: isActive(menu.href) ? 700 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2, mx: 2 }} />

        {/* Auth Actions */}
        <List sx={{ px: 2 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={authUser ? "/" : "/login"}
              onClick={authUser ? handleLogout : onClose}
              sx={{
                borderRadius: 2,
                color: authUser ? "error.main" : "primary.main",
                bgcolor: authUser
                  ? alpha(theme.palette.error.main, 0.05)
                  : alpha(theme.palette.primary.main, 0.05),
                "&:hover": {
                  bgcolor: authUser
                    ? alpha(theme.palette.error.main, 0.1)
                    : alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <ListItemText
                primary={authUser ? "Logout" : "Login"}
                primaryTypographyProps={{ fontWeight: 700 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

MobileDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  authUser: PropTypes.object,
  onSignOut: PropTypes.func.isRequired,
};

export default MobileDrawer;
