import { useEffect, useState } from "react";
import { useTaskContext } from "../context/useTaskContext";
import {
  addHeaders,
  fetchWithTimeOut,
  handleResponse,
  handleResponseError,
} from "@/src/utils/helperFunctions";

const useTasks = () => {
  const [state, setState] = useState({
    isLoading: false,
  });
  const { setState: setTaskState } = useTaskContext();

  const fetchTaskFromServer = async () => {
    console.log("fetchTaskFromServer");

    try {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      const headers = addHeaders();
      const requestOptions = {
        method: "GET",
        headers,
        body: JSON.stringify(data),
      };
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
