import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useNotification from '../hooks/useNotification';
import {
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment,
  asyncToggleUpVoteComment,
} from '../states/comment/action';
import { getTimeAgo } from '../utils/format';

function CommentItem({ comment }) {
  const { id: threadId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = useNotification();
  const authUser = useSelector((state) => state.authUser);

  const isUpVoted = authUser && comment.upVotesBy?.includes(authUser.id);
  const isDownVoted = authUser && comment.downVotesBy?.includes(authUser.id);
  const voteScore = (comment.upVotesBy?.length || 0) - (comment.downVotesBy?.length || 0);

  function handleUpVote() {
    if (!authUser) {
      notify({ type: 'error', message: 'You need to login to vote.' });
      navigate('/login');
      return;
    }
    if (isUpVoted) {
      dispatch(asyncToggleNeutralVoteComment({ threadId, commentId: comment.id }));
    } else {
      dispatch(asyncToggleUpVoteComment({ threadId, commentId: comment.id }));
    }
  }

  function handleDownVote() {
    if (!authUser) {
      notify({ type: 'error', message: 'You need to login to vote.' });
      navigate('/login');
      return;
    }
    if (isDownVoted) {
      dispatch(asyncToggleNeutralVoteComment({ threadId, commentId: comment.id }));
    } else {
      dispatch(asyncToggleDownVoteComment({ threadId, commentId: comment.id }));
    }
  }

  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Comment Voting */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pt: 0.5,
            }}
          >
            <IconButton
              size="small"
              onClick={handleUpVote}
              sx={{
                color: isUpVoted ? '#f97316' : 'text.secondary',
                bgcolor: isUpVoted ? alpha('#f97316', 0.1) : 'transparent',
                '&:hover': {
                  color: '#f97316',
                  bgcolor: alpha('#f97316', 0.1),
                },
              }}
            >
              <ArrowUpwardRoundedIcon fontSize="small" />
            </IconButton>
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{
                color: isUpVoted ? '#f97316' : isDownVoted ? '#8b5cf6' : 'text.primary',
              }}
            >
              {voteScore}
            </Typography>
            <IconButton
              size="small"
              onClick={handleDownVote}
              sx={{
                color: isDownVoted ? '#8b5cf6' : 'text.secondary',
                bgcolor: isDownVoted ? alpha('#8b5cf6', 0.1) : 'transparent',
                '&:hover': {
                  color: '#8b5cf6',
                  bgcolor: alpha('#8b5cf6', 0.1),
                },
              }}
            >
              <ArrowDownwardRoundedIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Comment Content */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1,
              }}
            >
              <Avatar
                src={comment.owner.avatar}
                alt={comment.owner.name}
                sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}
              >
                {comment.owner.name?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Typography variant="body2" fontWeight={600}>
                {comment.owner.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                • {getTimeAgo(comment.createdAt)}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {parse(comment.content)}
            </Typography>

            {/* Comment Actions */}
            <Box sx={{ display: 'flex', gap: 2, mt: 1.5 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  cursor: 'pointer',
                  fontWeight: 600,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Reply
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  cursor: 'pointer',
                  fontWeight: 600,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Share
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentItem;
