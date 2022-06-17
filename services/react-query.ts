import { QueryClient } from 'react-query'

const ReactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default ReactQueryClient
