import api from "../../utils/api";
import { setNotifActionCreator } from "../notification/action";

const ActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ email, password, name }) {
  return async () => {
    try {
      const response = await api.post("/register", null, {
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });
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

export { ActionType, asyncRegisterUser, receiveUsersActionCreator };
