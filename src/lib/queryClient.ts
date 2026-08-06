import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error
        ) {
          const status = (
            error as {
              response?: { status?: number };
            }
          ).response?.status;

          if (status === 401 || status === 403) {
            return false;
          }
        }

        return failureCount < 3;
      },

      staleTime: 1000 * 60 * 5,

      gcTime: 1000 * 60 * 10,

      refetchOnWindowFocus: false,

      refetchOnReconnect: true,

      refetchOnMount: false,
    },

    mutations: {
      retry: false,
    },
  },
});
