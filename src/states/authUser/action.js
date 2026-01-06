import api from '../../utils/api';
import { hideLoadingActionCreator, showLoadingActionCreator } from '../loading/action';
import { setNotifActionCreator } from '../notification/action';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
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
    dispatch(showLoadingActionCreator());
    try {
      const response = await api.post('/login', null, {
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const { token } = response.data;
      localStorage.setItem('accessToken', token);

      const authUserResponse = await api.get('/users/me', token);
      const authUser = authUserResponse.data.user;
      dispatch(setAuthUserActionCreator(authUser));
      return true;
    } catch (error) {
      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: error.message,
        })
      );
      return false;
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    localStorage.removeItem('accessToken');
  };
}

export { ActionType, asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator };
