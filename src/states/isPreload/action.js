import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { setNotifActionCreator } from '../notification/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('accessToken');

      if (token) {
        const authUserResponse = await api.get('/users/me', token);
        const authUser = authUserResponse.data.user;
        dispatch(setAuthUserActionCreator(authUser));
      } else {
        dispatch(setAuthUserActionCreator(null));
      }
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));

      dispatch(
        setNotifActionCreator({
          type: 'error',
          message: error.message,
        })
      );
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export { ActionType, asyncPreloadProcess, setIsPreloadActionCreator };
