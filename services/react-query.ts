import { QueryClient } from 'react-query';

const ReactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      retryOnMount: false,
    },
  },
});

export default ReactQueryClient;
