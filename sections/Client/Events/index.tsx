import { Grid, GridItem } from '@chakra-ui/react'

import { GET_USER_EVENTS } from 'services/queries'
import SimpleEmptyState from 'components/SimpleEmptyState'
import { useQuery } from 'react-query'
import EventCard from 'components/EventCard'

const Events: React.FC = () => {
  const { data } = useQuery('userEvents', GET_USER_EVENTS)

  if (!data || !data.data.length) { return <SimpleEmptyState title="Não há eventos disponíveis no momento" /> }
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
      {data.data.map((event) => (
        <GridItem>
          <EventCard {...event} />
        </GridItem>
      ))}
    </Grid>
  )
}

export default Events
