import { useState } from "react";
import Constants from "expo-constants";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { fetchWithTimeOut } from "@/src/utils/helperFunctions";
import { useAuthContext } from "@/src/auth/context/useAuthContext";

const useLogin = () => {
  const [state, setState] = useState({
    isLoading: false,
    userId: "",
    password: "",
    loginError: false,
  });
  const { API_URL } = Constants.expoConfig.extra;
  const { setItem: setUser } = useAsyncStorage("user");
  const { setState: setAuthState } = useAuthContext();

  const authenticateUser = async ({}) => {
    try {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        loginError: "",
      }));
      if (!state.userId && !state.password) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          loginError: "Enter All Fields",
        }));
        return;
      }
      const data = {
        userId: state.userId,
        password: state.password,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetchWithTimeOut({
        url: `${API_URL}/auth/login`,
        requestOptions,
      });

      const result = await response.json();
      if (result.status) {
        await setUser(JSON.stringify(result?.data));
        // updating auth context values
        setAuthState((prev) => {
          return {
            ...prev,
            authenticated: true,
            user: result.data,
          };
        });
      } else {
        setState((prev) => ({
          ...prev,
          loginError: "Invalid credentials",
        }));
      }
      // toggle loading indicator
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        loginError: "Server down try after sometime",
      }));
    }
  };

  return {
    ...state,
    setState,
    authenticateUser,
  };
};
export default useLogin;
