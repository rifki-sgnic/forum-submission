import React from 'react';
import PropTypes from 'prop-types';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';

function CommentInput({ onAddComment, authUser, isLoading }) {
  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: yup.object({
      content: yup.string().required('Comment is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      onAddComment(values.content);
      resetForm();
    },
  });

  const { values, handleChange, handleSubmit } = formik;

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
          {authUser?.name?.charAt(0)?.toUpperCase() || '?'}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <TextField
            name="content"
            placeholder={authUser ? 'What are your thoughts?' : 'Login to comment...'}
            multiline
            rows={3}
            fullWidth
            disabled={!authUser || isLoading}
            value={values.content}
            onChange={handleChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendRoundedIcon />}
              disabled={!authUser || !values.content.trim() || isLoading}
            >
              {isLoading ? 'Sending...' : 'Comment'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
  authUser: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default CommentInput;
