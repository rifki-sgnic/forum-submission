import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

function ErrorPage({ error, resetErrorBoundary }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            bgcolor: alpha(theme.palette.error.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
          }}
        >
          <WarningRoundedIcon sx={{ fontSize: 64, color: theme.palette.error.main }} />
        </Box>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Something went wrong
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {error.message || 'An unexpected error occurred.'}
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<RefreshRoundedIcon />}
          onClick={resetErrorBoundary}
          sx={{ borderRadius: 2, px: 4, py: 1.5 }}
        >
          Try Again
        </Button>
      </Container>
    </Box>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

export default ErrorPage;
