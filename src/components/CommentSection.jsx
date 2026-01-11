import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { asyncAddComment } from '../states/comment/action';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

function CommentSection({ comments, authUser }) {
  const { id: threadId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading > 0);

  function onAddComment(content) {
    dispatch(asyncAddComment({ threadId, content }));
  }

  return (
    <Box sx={{ mt: 4 }}>
      {/* Add Comment */}
      <CommentInput onAddComment={onAddComment} authUser={authUser} isLoading={isLoading} />

      {/* Comments Header */}
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
        💬 Comments ({comments.length})
      </Typography>

      {/* Comments List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </Box>
    </Box>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  authUser: PropTypes.object,
};

export default CommentSection;
