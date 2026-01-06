import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { asyncAddThread } from '../states/threads/action';

function AddThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const initialValues = {
    title: '',
    category: '',
    body: '',
  };
  const { values, handleChange } = useForm(initialValues);

  const onAddThread = (values) => {
    dispatch(asyncAddThread(values));
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.title || !values.body || !values.category) return;
    onAddThread(values);
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

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Title"
              id="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Give your thread a clear title"
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: alpha(theme.palette.background.default, 0.5),
                },
              }}
            />

            <TextField
              label="Category"
              id="category"
              value={values.category}
              onChange={handleChange}
              placeholder="e.g., technology, general, introduction"
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: alpha(theme.palette.background.default, 0.5),
                },
              }}
            />

            <TextField
              label="Content"
              id="body"
              value={values.body}
              onChange={handleChange}
              placeholder="What's on your mind? (HTML supported)"
              fullWidth
              required
              multiline
              minRows={6}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: alpha(theme.palette.background.default, 0.5),
                },
              }}
              helperText="You can use simple HTML tags for formatting."
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SendRoundedIcon />}
                disabled={!values.title || !values.body || !values.category}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: `0 8px 16px -4px ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              >
                Post Thread
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

export default AddThreadPage;
