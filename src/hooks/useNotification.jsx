import { useDispatch } from 'react-redux';
import { setNotifActionCreator } from '../states/notification/action';

function useNotification() {
  const dispatch = useDispatch();

  const notify = ({ type = 'info', message = '', shouldClosePrev = false }) => {
    dispatch(
      setNotifActionCreator({
        notif: {
          type,
          message,
          shouldClosePrev,
        },
      })
    );
  };

  return notify;
}

export default useNotification;
