import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function AddThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const onAddThread = (values) => {
    dispatch(asyncAddThread(values));
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 80px)', pb: 4 }}>
      <Container maxWidth="md" sx={{ pt: 3 }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate('/')}
          sx={{
            mb: 3,
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
              bgcolor: alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          Back to Threads
        </Button>

        <Card sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Create New Thread
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Start a discussion, ask a question, or share something interesting.
          </Typography>

          <ThreadInput onAddThread={onAddThread} />
        </Card>
      </Container>
    </Box>
  );
}

export default AddThreadPage;
