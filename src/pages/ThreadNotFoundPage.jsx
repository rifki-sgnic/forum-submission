import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function ThreadNotFoundPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pb: 8,
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
          <SearchOffRoundedIcon
            sx={{ fontSize: 64, color: theme.palette.error.main }}
          />
        </Box>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Thread not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sorry, we couldn't find the thread you're looking for.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeRoundedIcon />}
          onClick={() => navigate('/')}
          sx={{ borderRadius: 2, px: 4, py: 1.5 }}
        >
          Go to Home
        </Button>
      </Container>
    </Box>
  );
}

export default ThreadNotFoundPage;
