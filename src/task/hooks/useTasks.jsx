import { useEffect, useState } from "react";
import { useTaskContext } from "../context/useTaskContext";
import useHelpers from "@/src/utils/helperFunctions";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const useTasks = () => {
  const [state, setState] = useState({
    isLoading: false,
  });
  const { setState: setTaskState } = useTaskContext();
  const { getItem: getAccessToken } = useAsyncStorage("ACCESS_TOKEN");
  const { fetchWithTimeOut, handleResponse, handleResponseError } =
    useHelpers();

  const fetchTaskFromServer = async () => {
    try {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      const accessToken = await getAccessToken();
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      console.log(requestOptions, "<<<<<<<<<<<<<<<<<<<<");

      const response = await fetchWithTimeOut({
        url: `${process.env.EXPO_PUBLIC_BASE_API_URL_PRODUCTION}/tasks`,
        requestOptions,
      });
      const result = await handleResponse(response);

      if (result?.status) {
        setTaskState((prev) => ({
          ...prev,
          tasks: result.data,
        }));
      }
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
      handleResponseError(error);
    }
  };

  useEffect(() => {
    fetchTaskFromServer();
  }, []);
  return {
    ...state,
    fetchTaskFromServer,
  };
};
export default useTasks;
