import { createContext, useContext, useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const { getItem: getUser } = useAsyncStorage("user");
  const [state, setState] = useState({
    isLoading: true,
    authenticated: false,
    user: null,
  });
  const isUserAuthenticated = async () => {
    const user = await getUser();

    setState((prev) => {
      if (user)
        return {
          ...prev,
          authenticated: true,
          isLoading: false,
          user: JSON.parse(user),
        };
      else
        return {
          ...prev,
          authenticated: false,
          isLoading: false,
        };
    });
  };
  useEffect(() => {
    isUserAuthenticated();
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error using Context");
  }
  return context;
};
export default AuthContextProvider;
