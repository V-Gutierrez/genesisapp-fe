import { QueryClient } from 'react-query'

const ReactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
      retryOnMount: false,
    },
  },
})

export default ReactQueryClient
