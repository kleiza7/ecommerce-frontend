import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ToastProvider from "./components/ToastProvider";
import TooltipProvider from "./components/TooltipProvider";
import { useCartHydrate } from "./hooks/useCartHydrate";
import { useFavoriteHydrate } from "./hooks/useFavoriteHydrate";
import { queryClient } from "./lib/ReactQuery";
import router from "./routes";
import { useUserStore } from "./stores/UserStore";

const App = () => {
  const hydrateUser = useUserStore((state) => state.hydrate);

  useCartHydrate();
  useFavoriteHydrate();

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToastProvider>
          <RouterProvider router={router} />
          <ScrollToTopButton />
        </ToastProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
