import { useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { fetchWithTimeOut } from "@/src/utils/helperFunctions";
import { useAuthContext } from "@/src/auth/context/useAuthContext";
const useSignUp = () => {
  const [state, setState] = useState({
    isLoading: false,
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    signUpError: false,
  });

  const { setItem: setUser } = useAsyncStorage("user");
  const { setState: setAuthState } = useAuthContext();

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(state.email);
  };
  const signupUser = async ({}) => {
    try {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        signUpError: "",
        emailError: "",
        passwordError: "",
      }));
      if (!state.email && !state.password && !state.name) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          nameError: "Enter Name",
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
        url: `${process.env.EXPO_PUBLIC_BASE_API_URL_PRODUCTION}/auth/signup`,
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
          signUpError: "Something went wrong",
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
    signupUser,
  };
};
export default useSignUp;
