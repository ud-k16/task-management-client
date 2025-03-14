import { useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAuthContext } from "../context/useAuthContext";

const useLogout = () => {
  const [state, setState] = useState({
    isLoading: false,
  });
  const { setState: setAuthState } = useAuthContext();
  const { removeItem: removeUser } = useAsyncStorage("user");

  const logoutUser = async () => {
    // logout in process indication
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    // clearing local storage of user
    await removeUser();

    // reset navigation object
    router.dismissAll();
    // setting auth state for render logic to show login page
    setAuthState((prev) => {
      return {
        ...prev,
        authenticated: false,
        user: null,
      };
    });
    // logout done indication
    setState((prev) => ({
      ...prev,
      isLoading: false,
    }));
  };

  return {
    ...state,
    logoutUser,
  };
};
export default useLogout;
