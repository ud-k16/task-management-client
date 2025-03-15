import { useEffect, useState } from "react";
import { useTaskContext } from "../context/useTaskContext";
import useHelpers from "@/src/utils/helperFunctions";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Keyboard } from "react-native";

const useTasks = () => {
  const [state, setState] = useState({
    isLoading: false,
    snackBarVisibility: false,
    snackBarMessage: "",
  });
  const showSnackBar = () =>
    setState((prev) => ({ ...prev, snackBarVisibility: true }));
  const hideSnackBar = () =>
    setState((prev) => ({ ...prev, snackBarVisibility: false }));
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

  const addTaskToServer = async ({ title = "", description = "" }) => {
    try {
      Keyboard.dismiss();
      const data = {
        title,
        description,
      };
      console.log(data, "data sent to db");

      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      const accessToken = await getAccessToken();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
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
        snackBarVisibility: true,
        snackBarMessage: "Task Added ",
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        snackBarVisibility: true,
        snackBarMessage: "Unable To add Task",
      }));
      handleResponseError(error);
    }
  };

  const updateTaskToServer = async ({ id, title = "", description = "" }) => {
    try {
      Keyboard.dismiss();
      const data = {
        title,
        description,
      };
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      const accessToken = await getAccessToken();
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetchWithTimeOut({
        url: `${process.env.EXPO_PUBLIC_BASE_API_URL_PRODUCTION}/tasks/${id}`,
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
        snackBarVisibility: true,
        snackBarMessage: "Task Modified",
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        snackBarVisibility: true,
        snackBarMessage: "Task Unable To Modify",
      }));
      handleResponseError(error);
    }
  };
  const deleteTaskToServer = async (id) => {
    try {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      const accessToken = await getAccessToken();
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetchWithTimeOut({
        url: `${process.env.EXPO_PUBLIC_BASE_API_URL_PRODUCTION}/tasks/${id}`,
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
        snackBarVisibility: true,
        snackBarMessage: "Task Deleted",
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        snackBarVisibility: true,
        snackBarMessage: "Task Unable To Delete",
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
    addTaskToServer,
    deleteTaskToServer,
    updateTaskToServer,
    showSnackBar,
    hideSnackBar,
  };
};
export default useTasks;
