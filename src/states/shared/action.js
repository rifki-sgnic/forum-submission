import api from "../../utils/api";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../loading/action";
import { setNotifActionCreator } from "../notification/action";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveUsersActionCreator } from "../users/action";

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const usersResponse = await api.get("/users");
      const users = usersResponse.data.users;

      const threadsResponse = await api.get("/threads");
      const threads = threadsResponse.data.threads;

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: "error",
          message: error.message,
        })
      );
    }
    dispatch(hideLoadingActionCreator());
  };
}

export { asyncPopulateUsersAndThreads };
