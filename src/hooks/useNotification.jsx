import { useDispatch } from "react-redux";
import { setNotifActionCreator } from "../states/notification/action";

function useNotification({ type = "error", message = "" }) {
  const dispatch = useDispatch();

  return dispatch(setNotifActionCreator({ type, message }));
}

export default useNotification;
