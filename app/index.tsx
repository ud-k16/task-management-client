import React from "react";
import { Text } from "react-native-paper";
import { useAuthContext } from "@/src/common/context/useAuthContext";
import Login from "@/app/auth/login";
import Tabs from "@/app/task/tabs";

const Main = () => {
  const { isLoading, authenticated } = useAuthContext();
  if (isLoading) return <Text>Wait</Text>;
  else if (!authenticated) return <Login />;
  return <Tabs />;
};

export default Main;
