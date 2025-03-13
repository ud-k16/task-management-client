import React from "react";
import { useAuthContext } from "@/src/common/context/useAuthContext";
import Login from "@/app/auth/login";
import Tabs from "@/app/task/tabs";
import Loader from "@/src/common/components/Loader";

const Main = () => {
  const { isLoading, authenticated } = useAuthContext();
  if (isLoading) return <Loader isLoading={isLoading} />;
  else if (!authenticated) return <Login />;
  return <Tabs />;
};

export default Main;
