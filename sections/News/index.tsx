import { Grid, GridItem } from '@chakra-ui/react'

import { GET_USER_NEWS } from 'services/queries'
import SimpleEmptyState from 'components/SimpleEmptyState'
import { useQuery } from 'react-query'
import NewsHighlightCard from 'components/NewsHighlightCard'

const News: React.FC = () => {
  const { data } = useQuery('userNews', GET_USER_NEWS)

  if (!data || !data.data.length)
    return <SimpleEmptyState title="Não há notícias disponíveis no momento" />
  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      gap={{ md: 1 }}
      templateRows={{
        base: 'repeat(auto-fit, 1fr)',
        sm: 'repeat(auto-fit, 1fr)',
        md: 'repeat(auto-fit, 1fr)',
        lg: 'repeat(auto-fit, 1fr)',
      }}
    >
      {data.data.map((news) => (
        <NewsHighlightCard {...news} key={news.id} />
      ))}
    </Grid>
  )
}

export default News
