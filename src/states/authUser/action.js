import api from "../../utils/api";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      const response = await api.post("/login", null, {
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const { token } = response.data;
      localStorage.setItem("accessToken", token);

      const authUserResponse = await api.get("/users/me", token);
      const authUser = authUserResponse.data.user;
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    localStorage.removeItem("accessToken");
  };
}

export {
  ActionType,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
};
