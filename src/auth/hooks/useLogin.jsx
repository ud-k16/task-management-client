import { useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import useHelpers from "@/src/utils/helperFunctions";
import { useAuthContext } from "@/src/auth/context/useAuthContext";
import { Keyboard } from "react-native";
import { useErrorContext } from "@/src/common/context/useErrorContext";

const useLogin = () => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    loginError: false,
  });

  const { setItem: setUser } = useAsyncStorage("user");
  const { setItem: setRefreshToken } = useAsyncStorage("REFRESH_TOKEN");
  const { setItem: setAccessToken } = useAsyncStorage("ACCESS_TOKEN");
  const { setState: setAuthState } = useAuthContext();
  const { showError } = useErrorContext();
  const { fetchWithTimeOut } = useHelpers();
  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(state.email);
  };
  const authenticateUser = async ({}) => {
    try {
      // hide keyboard
      Keyboard.dismiss();
      setState((prev) => ({
        ...prev,
        isLoading: true,
        loginError: "",
        emailError: "",
        passwordError: "",
      }));
      if (!state.email && !state.password) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          emailError: "Enter Email",
          passwordError: "Enter Password",
        }));
        return;
      }
      const isValidEmail = validateEmail();
      if (!isValidEmail) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          emailError: "Enter valid Email",
        }));
        return;
      }
      const data = {
        email: state.email,
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
        url: `${process.env.EXPO_PUBLIC_BASE_API_URL_PRODUCTION}/auth/login`,
        requestOptions,
      });

      const result = await response.json();
      if (result.status) {
        console.log(result);
        await setUser(JSON.stringify(result.data.user));
        await setRefreshToken(result.data.token.refreshToken);
        await setAccessToken(result.data.token.accessToken);

        // updating auth context values
        setAuthState((prev) => {
          return {
            ...prev,
            authenticated: true,
            user: result.data.user,
          };
        });
      } else {
        console.log(result);
        setState((prev) => ({
          ...prev,
          loginError: "Invalid credentials",
        }));
        showError(result.message);
      }
      // toggle loading indicator
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    } catch (error) {
      showError();
    } finally {
      setState((prev) => ({
        ...prev,
        isLoading: false,
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
