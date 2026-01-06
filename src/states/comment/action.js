import api from '../../utils/api';
import { setNotifActionCreator } from '../notification/action';

const ActionType = {
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
  TOGGLE_NEUTRAL_VOTE_COMMENT: 'TOGGLE_NEUTRAL_VOTE_COMMENT',
};

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleNeutralVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await api.post(`/threads/${threadId}/comments`, token, {
        body: JSON.stringify({
          content,
        }),
      });

      const comment = response.data.comment;
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: error.message,
        })
      );
    }
  };
}

function asyncToggleUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: 'You need to login to vote.',
        })
      );
      return;
    }
    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      const token = localStorage.getItem('accessToken');
      await api.post(`/threads/${threadId}/comments/${commentId}/up-vote`, token);
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: error.message,
        })
      );
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncToggleDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: 'You need to login to vote.',
        })
      );
      return;
    }
    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      const token = localStorage.getItem('accessToken');
      await api.post(`/threads/${threadId}/comments/${commentId}/down-vote`, token);
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: error.message,
        })
      );
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncToggleNeutralVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: 'You need to login to vote.',
        })
      );
      return;
    }
    dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      const token = localStorage.getItem('accessToken');
      await api.post(`/threads/${threadId}/comments/${commentId}/neutral-vote`, token);
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: error.message,
        })
      );
      dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  addCommentActionCreator,
  asyncAddComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment,
  asyncToggleUpVoteComment,
  toggleDownVoteCommentActionCreator,
  toggleNeutralVoteCommentActionCreator,
  toggleUpVoteCommentActionCreator,
};
