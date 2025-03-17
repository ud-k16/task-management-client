import { useState } from "react";
import useHelpers from "@/src/utils/helperFunctions";
import { router } from "expo-router";
import { useErrorContext } from "@/src/common/context/useErrorContext";
import { Keyboard } from "react-native";

const useSignUp = () => {
  const [state, setState] = useState({
    isLoading: false,
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: "",
  });
  const { fetchWithTimeOut } = useHelpers();
  const { showError } = useErrorContext();
  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(state.email);
  };
  const signupUser = async ({}) => {
    try {
      Keyboard.dismiss();
      setState((prev) => ({
        ...prev,
        isLoading: true,
        nameError: "",
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
        name: state.name,
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
      console.log(
        "signup response from server",
        JSON.stringify(result, null, 4)
      );
      if (result.status) {
        router.navigate("/auth/login");
      } else {
        showError(result?.message);
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
    signupUser,
  };
};
export default useSignUp;
