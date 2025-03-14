import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import useLogout from "../auth/hooks/useLogout";
import { useErrorContext } from "../common/context/useErrorContext";

export const fetchWithTimeOut = async ({
  url,
  requestOptions,
  timeOut = 10000,
}) => {
  console.log(
    "Fetch url : ",
    url,
    "\n Request Object : ",
    JSON.stringify(requestOptions, null, 4)
  );

  // creating new controller object
  const controller = new AbortController();
  const signal = controller.signal;
  try {
    const id = setTimeout(() => {
      // abort the fetch if it reached the wait time
      controller.abort();
      clearTimeout(id);
    }, timeOut);
    //   making fetch request
    const response = await fetch(url, { ...requestOptions, signal });
    //    return response
    return response;
  } catch (error) {
    console.log("Error occured in the Fetch With TimeOut Function", error);
    throw error;
  }
};

export const handleResponseError = (error) => {
  const { showError } = useErrorContext();
  try {
    if (error instanceof TypeError) {
      console.log("Network Error ");
      showError();
    } else if (error instanceof DOMException && error.name === "AbortError") {
      console.log("Fetch request aborted");
      showError();
    } else console.log(error.message);
  } catch (error) {
    console.log("Error in handle Response Error function");
    showError();
  }
};

/**
 * common response handler
 * if status of response 200 then parses the response for data send by server
 * on unauthorized error [401] calls unauthorized error handler
 * @param {*} response
 * @returns result object server sends
 */
export const handleResponse = async (response) => {
  try {
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else if (response.status === 401) {
      handleUnAuthorizedError();
    } else if (response.status === 500) {
      // internal server error
    } else if (response.status === 400) {
      // bad request
    }
  } catch (error) {
    console.log("Error in handle Response function");
  }
};
const handleUnAuthorizedError = async () => {
  try {
    console.log("handleUnAuthorizedError");

    const { getItem: getRefreshToken } = useAsyncStorage("REFRESH_TOKEN");
    const { setItem: setAccessToken } = useAsyncStorage("ACCESS_TOKEN");
    const { logoutUser } = useLogout();
    const refreshToken = await getRefreshToken();
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    const response = await fetchWithTimeOut({
      url: `${process.env.EXPO_PUBLIC_BASE_API_URL_PRODUCTION}/auth/access-token`,
      requestOptions,
    });
    if (response.status === 200) {
      const result = await response.json();
      if (result?.status) await setAccessToken(result.accessToken);
    } else if (response.status === 401) {
      // loggout the user stating session expired
      logoutUser();
    }
  } catch (error) {
    handleResponseError(error);
  }
};
/**
 *  returns header option object for fetch request
 */
export const addHeaders = async ({ contentType = "application/json" }) => {
  const { getItem: getAccessToken } = useAsyncStorage("ACCESS_TOKEN");
  const accessToken = await getAccessToken();
  return {
    "Content-Type": contentType,
    Authorization: `Bearer ${accessToken}`,
  };
};

export const getBaseUrl = () =>
  process.env.APP_VARIANT === "dev"
    ? process.env.EXPO_PUBLIC_BASE_API_URL_DEVELOPEMENT
    : process.env.EXPO_PUBLIC_BASE_API_URL_PRODUCTION;
