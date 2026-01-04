const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
};

const receiveThreadsActionCreator = (threads) => {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
};

export { receiveThreadsActionCreator };
