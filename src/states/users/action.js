import api from "../../utils/api";

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
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };
}

export { ActionType, asyncRegisterUser, receiveUsersActionCreator };
