const threadsReducer = (threads = [], action = {}) => {
  switch (action.type) {
    case "RECEIVE_THREADS":
      return action.payload.threads;
    default:
      return threads;
  }
};

export default threadsReducer;
