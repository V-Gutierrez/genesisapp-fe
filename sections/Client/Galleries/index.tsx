import { useQuery } from "react-query"
import { GET_GALLERIES } from "services/queries"

const Galleries: React.FC = () => (
  const { data } = useQuery('galleries', GET_GALLERIES, {
  staleTime: Infinity,
  cacheTime: Infinity,
})
)

export default Galleries
