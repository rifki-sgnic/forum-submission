import api from "../../utils/api";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveUsersActionCreator } from "../users/action";

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    try {
      const usersResponse = await api.get("/users");
      const users = usersResponse.data.users;

      const threadsResponse = await api.get("/threads");
      const threads = threadsResponse.data.threads;

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { asyncPopulateUsersAndThreads };
