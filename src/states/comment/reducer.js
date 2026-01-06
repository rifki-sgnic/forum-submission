import { ActionType as ThreadDetailActionType } from '../threadDetail/action';
import { ActionType } from './action';

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
    case ThreadDetailActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail.comments;
    case ActionType.ADD_COMMENT:
      return [action.payload.comment, ...comments];
    case ActionType.TOGGLE_UP_VOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : comment.upVotesBy.concat([action.payload.userId]),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      });
    case ActionType.TOGGLE_DOWN_VOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : comment.downVotesBy.concat([action.payload.userId]),
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      });
    case ActionType.TOGGLE_NEUTRAL_VOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      });
    default:
      return comments;
  }
}

export default commentsReducer;
