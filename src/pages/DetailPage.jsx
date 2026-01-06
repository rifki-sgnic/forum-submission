import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import ThreadDetail from '../components/ThreadDetail';
import ThreadDetailSkeleton from '../components/ThreadDetailSkeleton';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import ThreadNotFoundPage from './ThreadNotFoundPage';

function DetailPage() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const threadDetail = useSelector((state) => state.threadDetail);
  const comments = useSelector((state) => state.comments);
  const isLoading = useSelector((state) => state.loading > 0);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Box sx={{ minHeight: 'calc(100vh - 80px)', pb: 4 }}>
        <Container maxWidth="md" sx={{ pt: 3 }}>
          <ThreadDetailSkeleton />
        </Container>
      </Box>
    );
  }

  if (!threadDetail) {
    return <ThreadNotFoundPage />;
  }

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

        {/* Main Thread Content */}
        <ThreadDetail {...threadDetail} authUser={authUser} />

        {/* Comments Section */}
        <CommentSection comments={comments} authUser={authUser} />
      </Container>
    </Box>
  );
}

export default DetailPage;
