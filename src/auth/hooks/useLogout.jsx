import { useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useAuthContext } from "@/src/auth/context/useAuthContext";
import { router } from "expo-router";

const useLogout = () => {
  const [state, setState] = useState({
    isLoading: false,
  });

  const { removeItem: removeUser } = useAsyncStorage("user");
  // const { removeItem: removeTimeTable } = useAsyncStorage("timeTable");
  const { setState: setAuthState } = useAuthContext();

  const logoutUser = async () => {
    // logout in process indication
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    // clearing local storage of user
    await removeUser();
    // // clearing local storage of timetable
    // await removeTimeTable();
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
