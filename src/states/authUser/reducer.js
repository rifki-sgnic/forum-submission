import api from "../../utils/api";
import { setAuthUserActionCreator } from "./action";

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

      const getOwnProfileResponse = await api.get("/users/me", token);
      const authUser = getOwnProfileResponse.data.user;
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { asyncSetAuthUser };
