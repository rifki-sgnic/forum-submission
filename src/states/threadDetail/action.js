import api from '../../utils/api';
import { hideLoadingActionCreator, showLoadingActionCreator } from '../loading/action';
import { setNotifActionCreator } from '../notification/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
  TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL: 'TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleUpVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.get(`/threads/${threadId}`, token);
      const threadDetail = response.data.detailThread;

      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: error.message,
        })
      );
    }
    dispatch(hideLoadingActionCreator());
  };
}

function asyncToggleUpVoteThreadDetail(threadId) {
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
    dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

    try {
      const token = localStorage.getItem('accessToken');
      await api.post(`/threads/${threadId}/up-vote`, token, {
        body: JSON.stringify({ userId: authUser.id }),
      });
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: error.message,
        })
      );
      dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToggleDownVoteThreadDetail(threadId) {
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
    dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

    try {
      const token = localStorage.getItem('accessToken');
      await api.post(`/threads/${threadId}/down-vote`, token, {
        body: JSON.stringify({ userId: authUser.id }),
      });
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: error.message,
        })
      );
      dispatch(
        toggleDownVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        })
      );
    }
  };
}

function asyncToggleNeutralVoteThreadDetail(threadId) {
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
    dispatch(
      toggleNeutralVoteThreadDetailActionCreator({
        threadId,
        userId: authUser.id,
      })
    );

    try {
      const token = localStorage.getItem('accessToken');
      await api.post(`/threads/${threadId}/neutral-vote`, token, {
        body: JSON.stringify({ userId: authUser.id }),
      });
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: error.message,
        })
      );
      dispatch(
        toggleNeutralVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        })
      );
    }
  };
}

export {
  ActionType,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralVoteThreadDetail,
  asyncToggleUpVoteThreadDetail,
  clearThreadDetailActionCreator,
  receiveThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleNeutralVoteThreadDetailActionCreator,
  toggleUpVoteThreadDetailActionCreator,
};
