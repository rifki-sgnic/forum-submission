import React from 'react';
import PropTypes from 'prop-types';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';

function LoginInput({ onLogin, isLoading }) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address').required('Email is required'),
      password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      onLogin(values);
    },
  });

  const { values, errors, touched, handleBlur, handleSubmit } = formik;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
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
        onBlur={handleBlur}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
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
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default LoginInput;
