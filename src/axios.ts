import axios from "axios";
import { TOAST_TYPE } from "./shared/enums/ToastType.enum";
import { showToast } from "./shared/utils/Toast.util";
import { useUserStore } from "./stores/UserStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      showToast({
        title: "Network Error",
        description: "No internet connection.",
        type: TOAST_TYPE.ERROR,
      });

      return Promise.reject(error);
    }

    const status = error.response.status;
    const serverMessage = error.response.data?.message;

    switch (status) {
      case 401: {
        showToast({
          title: "Session expired",
          description: serverMessage ?? "Please login again.",
          type: TOAST_TYPE.ERROR,
        });

        useUserStore.getState().logout();

        window.location.replace("/");
        break;
      }

      case 403: {
        showToast({
          title: "Forbidden",
          description:
            serverMessage ??
            "You do not have permission to perform this action.",
          type: TOAST_TYPE.ERROR,
        });
        break;
      }

      case 429: {
        showToast({
          title: "Too Many Requests",
          description:
            serverMessage ??
            "You are sending requests too frequently. Please try again later.",
          type: TOAST_TYPE.ERROR,
        });
        break;
      }

      case 500: {
        showToast({
          title: "Server Error",
          description: serverMessage ?? "An unexpected server error occurred.",
          type: TOAST_TYPE.ERROR,
        });
        break;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
