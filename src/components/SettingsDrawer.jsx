import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";

const SettingsDrawer = ({ open, onClose }) => {
  const { mode, setTheme } = useTheme();

  const handleThemeChange = (event, newMode) => {
    if (newMode !== null) {
      setTheme(newMode);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 280, p: 3 }} role="presentation">
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Settings
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Appearance
          </Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleThemeChange}
            aria-label="theme preference"
            fullWidth
            size="small"
            sx={{ mt: 1 }}
          >
            <ToggleButton value="light" aria-label="light mode">
              <LightModeIcon sx={{ mr: 1, fontSize: 20 }} />
              Light
            </ToggleButton>
            <ToggleButton value="dark" aria-label="dark mode">
              <DarkModeIcon sx={{ mr: 1, fontSize: 20 }} />
              Dark
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Drawer>
  );
};

SettingsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsDrawer;
