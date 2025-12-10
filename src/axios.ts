import axios from "axios";
// import { reqUsersLogout } from "./api/controllers/Users.controller";
// import { TOAST_TYPE } from "./shared/enums/ToastType.enum";
// import { getUserFromStorage } from "./shared/utils/Auth.util";
// import { showToast } from "./shared/utils/Toast.util";
// import { useUserStore } from "./stores/UserStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// axiosInstance.interceptors.request.use((config) => {
//   const token =
//     useUserStore.getState().user?.accessToken ??
//     getUserFromStorage()?.accessToken;

//   if (token) config.headers.set("Authorization", `Bearer ${token}`);

//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     if (!err.response) {
//       showToast({
//         title: "Network Error",
//         description: "No internet connection.",
//         type: TOAST_TYPE.ERROR,
//       });
//       return Promise.reject(err);
//     }

//     const status = err.response.status;
//     const serverMessage = err.response.data?.message;

//     switch (status) {
//       case 401:
//         showToast({
//           title: "Unauthorized",
//           description: serverMessage ?? "Session expired. Please login again.",
//           type: TOAST_TYPE.ERROR,
//         });

//         try {
//           await reqUsersLogout();
//         } catch (_) {}

//         useUserStore.getState().logout();
//         window.location.href = "/auth";
//         break;

//       case 403:
//         showToast({
//           title: "Forbidden",
//           description: serverMessage ?? "You do not have permission.",
//           type: TOAST_TYPE.ERROR,
//         });
//         break;

//       case 429:
//         showToast({
//           title: "Too Many Requests",
//           description: serverMessage ?? "Please slow down and try again later.",
//           type: TOAST_TYPE.ERROR,
//         });
//         break;

//       case 500:
//         showToast({
//           title: "Server Error",
//           description: serverMessage ?? "Unexpected server error occurred.",
//           type: TOAST_TYPE.ERROR,
//         });
//         break;
//     }

//     return Promise.reject(err);
//   }
// );

export default axiosInstance;
