import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ButtonBase from '@mui/material/ButtonBase';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import useThemeMode from '../hooks/useTheme';

function SettingsDrawer({ open, onClose }) {
  const theme = useTheme();
  const { mode, setTheme, color, setColor } = useThemeMode();

  function handleThemeChange(event, newMode) {
    if (newMode !== null) {
      setTheme(newMode);
    }
  }

  const colors = [
    { id: 'purple', value: '#6366f1', label: 'Purple' },
    { id: 'blue', value: '#2563eb', label: 'Blue' },
    { id: 'green', value: '#10b981', label: 'Green' },
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 3, height: '100%' }} role="presentation">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: 'primary.main',
            }}
          >
            <PaletteRoundedIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Settings
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Customize your experience
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Appearance Section */}
        <Box>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 1 }}
          >
            Appearance
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Choose your preferred theme mode
          </Typography>

          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleThemeChange}
            aria-label="theme preference"
            fullWidth
            sx={{
              bgcolor: alpha(theme.palette.text.primary, 0.03),
              borderRadius: 2,
              p: 0.5,
              '& .MuiToggleButtonGroup-grouped': {
                border: 'none',
                borderRadius: '8px !important',
                mx: 0.25,
              },
            }}
          >
            <ToggleButton
              value="light"
              aria-label="light mode"
              sx={{ py: 1.5, gap: 1 }}
            >
              <LightModeRoundedIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" fontWeight={600}>
                Light
              </Typography>
            </ToggleButton>
            <ToggleButton
              value="dark"
              aria-label="dark mode"
              sx={{ py: 1.5, gap: 1 }}
            >
              <DarkModeRoundedIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" fontWeight={600}>
                Dark
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Color Theme Section */}
        <Box>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 1 }}
          >
            Color Theme
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select an accent color
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {colors.map((c) => (
              <ButtonBase
                key={c.id}
                onClick={() => setColor(c.id)}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: c.value,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  border:
                    color === c.id
                      ? `3px solid ${theme.palette.background.paper}`
                      : '2px solid transparent',
                  boxShadow: color === c.id ? `0 0 0 2px ${c.value}` : 'none',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {color === c.id && (
                  <CheckRoundedIcon sx={{ color: '#fff', fontSize: 24 }} />
                )}
              </ButtonBase>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* About Section */}
        <Box>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 1 }}
          >
            About
          </Typography>
          <Box
            sx={{
              p: 2,
              mt: 1,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Threads Forum
            </Typography>
            <Typography variant="caption" color="text.secondary">
              A modern community discussion platform built with React and
              Material UI.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}

SettingsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsDrawer;
