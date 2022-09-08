import { Grid, GridItem } from '@chakra-ui/react'

import DevotionalCard from 'components/DevotionalCard'
import { GET_USER_DEVOTIONALS } from 'services/queries'
import SimpleEmptyState from 'components/SimpleEmptyState'
import { useQuery } from 'react-query'

const Devotionals: React.FC = () => {
  const { data } = useQuery('userDevotionals', GET_USER_DEVOTIONALS)

  if (!data || !data.data.length)
    return <SimpleEmptyState title="Não há devocionais disponíveis no momento" />
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
      {data.data.map((devotional) => (
        <GridItem>
          <DevotionalCard key={devotional.id} {...devotional} />
        </GridItem>
      ))}
    </Grid>
  )
}

export default Devotionals
