import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import ToastProvider from "./components/ToastProvider";
import { queryClient } from "./lib/ReactQuery";
import router from "./routes";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />;
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
