import api from "../../utils/api";
import { setNotifActionCreator } from "../notification/action";

const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  TOGGLE_UP_VOTE_THREAD: "TOGGLE_UP_VOTE_THREAD",
  TOGGLE_DOWN_VOTE_THREAD: "TOGGLE_DOWN_VOTE_THREAD",
  TOGGLE_NEUTRAL_VOTE_THREAD: "TOGGLE_NEUTRAL_VOTE_THREAD",
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/threads", token, {
        body: JSON.stringify({
          title,
          body,
          category,
        }),
      });

      const thread = response.data.thread;
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: "error",
          message: error.message,
        })
      );
    }
  };
}

// Best Practice: Optimistic UI Update
// 1. Dispatch action immediately
// 2. Call API
// 3. If API fails, dispatch action again to revert (simple toggle) OR more complex rollback
function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      dispatch(
        setNotifActionCreator({
          type: "error",
          message: "You need to login to vote.",
        })
      );
      return;
    }
    dispatch(
      toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id })
    );

    try {
      const token = localStorage.getItem("accessToken");
      await api.post(`/threads/${threadId}/up-vote`, token, {
        body: JSON.stringify({ userId: authUser.id }),
      });
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: "error",
          message: error.message,
        })
      );
      dispatch(
        toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id })
      );
    }
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      dispatch(
        setNotifActionCreator({
          type: "error",
          message: "You need to login to vote.",
        })
      );
      return;
    }
    dispatch(
      toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id })
    );

    try {
      const token = localStorage.getItem("accessToken");
      await api.post(`/threads/${threadId}/down-vote`, token, {
        body: JSON.stringify({ userId: authUser.id }),
      });
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: "error",
          message: error.message,
        })
      );
      dispatch(
        toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id })
      );
    }
  };
}

function asyncToggleNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      dispatch(
        setNotifActionCreator({
          type: "error",
          message: "You need to login to vote.",
        })
      );
      return;
    }
    dispatch(
      toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id })
    );

    try {
      const token = localStorage.getItem("accessToken");
      await api.post(`/threads/${threadId}/neutral-vote`, token, {
        body: JSON.stringify({ userId: authUser.id }),
      });
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: "error",
          message: error.message,
        })
      );
      dispatch(
        toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id })
      );
    }
  };
}

export {
  ActionType,
  addThreadActionCreator,
  asyncAddThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralVoteThread,
  asyncToggleUpVoteThread,
  receiveThreadsActionCreator,
  toggleDownVoteThreadActionCreator,
  toggleNeutralVoteThreadActionCreator,
  toggleUpVoteThreadActionCreator,
};
