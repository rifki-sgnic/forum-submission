import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { asyncSetAuthUser } from '../../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loading > 0);

  const initialValues = {
    email: '',
    password: '',
  };
  const { values, handleChange } = useForm(initialValues);

  async function onLogin(event) {
    event.preventDefault();
    const user = await dispatch(asyncSetAuthUser(values));

    if (user) {
      navigate('/');
    }
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Card>
          <CardContent sx={{ p: 4 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  bgcolor: 'primary.main',
                }}
              >
                <RocketLaunchIcon sx={{ color: '#fff', fontSize: 28 }} />
              </Box>
            </Box>

            <Typography variant="h5" component="h1" align="center" fontWeight={700} gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
              Sign in to continue the conversation
            </Typography>

            <Box component="form" onSubmit={onLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={values.email}
                onChange={handleChange}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={values.password}
                onChange={handleChange}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'primary.main',
                    cursor: 'pointer',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Forgot password?
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ py: 1.5, fontWeight: 700 }}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" color="text.secondary">
                or
              </Typography>
            </Divider>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Box
                  component={Link}
                  to="/register"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 700,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Create one
                </Box>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default LoginPage;
