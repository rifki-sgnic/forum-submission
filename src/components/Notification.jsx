import { useSnackbar } from 'notistack';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotifActionCreator } from '../states/notification/action';

function Notification() {
  const notif = useSelector((state) => state.notif);
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const lastKeyRef = useRef(null);

  useEffect(() => {
    if (notif) {
      const { type, message, shouldClosePrev = false, persist = false } = notif;

      if (shouldClosePrev && lastKeyRef.current) {
        closeSnackbar(lastKeyRef.current);
      }

      const key = enqueueSnackbar(message, {
        variant: type,
        persist,
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });

      lastKeyRef.current = key;
      dispatch(clearNotifActionCreator());
    }
  }, [notif, enqueueSnackbar, closeSnackbar, dispatch]);

  return null;
}

export default Notification;
