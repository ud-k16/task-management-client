import { useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { fetchWithTimeOut } from "@/src/utils/helperFunctions";
import { useAuthContext } from "@/src/auth/context/useAuthContext";
import { getBaseUrl } from "../../utils/helperFunctions";

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
  const { setState: setAuthState } = useAuthContext();

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(state.email);
  };
  const authenticateUser = async ({}) => {
    try {
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
        url: `${getBaseUrl}/auth/login`,
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
