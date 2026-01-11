import React from 'react';
import PropTypes from 'prop-types';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

function ThreadInput({ onAddThread }) {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      body: '',
    },
    validationSchema: yup.object({
      title: yup.string().min(5, 'Title must be at least 5 characters').required('Title is required'),
      category: yup.string().required('Category is required'),
      body: yup.string().min(10, 'Content must be at least 10 characters').required('Content is required'),
    }),
    onSubmit: (values) => onAddThread(values),
  });

  const { values, handleChange, errors, touched, handleBlur, handleSubmit } = formik;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Title"
        name="title"
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
        onBlur={handleBlur}
        error={touched.title && Boolean(errors.title)}
        helperText={touched.title && errors.title}
      />

      <TextField
        label="Category"
        name="category"
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
        onBlur={handleBlur}
        error={touched.category && Boolean(errors.category)}
        helperText={touched.category && errors.category}
      />

      <TextField
        label="Content"
        name="body"
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
        onBlur={handleBlur}
        error={touched.body && Boolean(errors.body)}
        helperText={touched.body && errors.body}
      />
      <Typography variant="subtitle2" color="text.secondary">
        You can use simple HTML tags for formatting.
      </Typography>

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
  );
}

ThreadInput.propTypes = {
  onAddThread: PropTypes.func.isRequired,
};

export default ThreadInput;
