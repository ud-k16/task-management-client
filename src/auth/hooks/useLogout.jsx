import { useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAuthContext } from "../context/useAuthContext";

const useLogout = () => {
  const [state, setState] = useState({
    isLoading: false,
  });
  const { setState: setAuthState, user } = useAuthContext();
  const { removeItem: removeUser } = useAsyncStorage("user");
  const { removeItem: removeRefreshToken } = useAsyncStorage("REFRESH_TOKEN");
  const { removeItem: removeAccessToken } = useAsyncStorage("ACCESS_TOKEN");
  const clearTokenFromServer = async () => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      };
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_API_URL_PRODUCTION}/auth/logout`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      showError(error.message);
      throw error;
    }
  };
  const logoutUser = async () => {
    // logout in process indication
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    // clearing local storage of user
    await removeUser();
    await removeAccessToken();
    await removeRefreshToken();
    await clearTokenFromServer();
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
const clearTokenFromServer = async () => {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    };
    const response = await fetchWithTimeOut({
      url: `${process.env.EXPO_PUBLIC_BASE_API_URL_PRODUCTION}/auth/logout/${id}`,
      requestOptions,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    showError(error.message);
    throw error;
  }
};
export default useLogout;
