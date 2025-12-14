import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import ToastProvider from "./components/ToastProvider";
import { queryClient } from "./lib/ReactQuery";
import router from "./routes";
import { useUserStore } from "./stores/UserStore";

const App = () => {
  const hydrate = useUserStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
