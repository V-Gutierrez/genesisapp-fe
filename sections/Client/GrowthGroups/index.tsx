import React, { useState } from 'react'

import { Flex } from '@chakra-ui/react'
import { GET_GROWTH_GROUPS } from 'services/queries'
import GroupList from 'sections/Client/GrowthGroups/components/GroupList'
import SimpleEmptyState from 'components/SimpleEmptyState'
import { useQuery } from 'react-query'
import MapFrame from './components/MapFrame'

const GrowthGroups: React.FC = () => {
  const { data } = useQuery('growthGroups', GET_GROWTH_GROUPS, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })
  const growthGroups = data?.data
  const [focusedCoords, setFocusedCoords] = useState<CoordsState>({ lat: null, lng: null })

  function onSelectGroup(lat: number, lng: number) {
    setFocusedCoords({ lat, lng })
  }

  if (!data) return null
  if (!data.data.length)
    return <SimpleEmptyState title="Não há Grupos de crescimento disponíveis no momento" />
  return (
    <Flex
      h="80vh"
      w="100%"
      justifyContent="center"
      alignItems="center"
      flexDir={{
        lg: 'row',
        sm: 'column',
        md: 'column',
        base: 'column',
      }}
      transition="1s all ease-in"
    >
      <MapFrame
        GCDataset={growthGroups as GrowthGroup[]}
        currentCoords={focusedCoords}
        selectCoordsHandler={onSelectGroup}
      />
      <GroupList
        GCDataset={growthGroups as GrowthGroup[]}
        selectCoordsHandler={onSelectGroup}
        currentCoords={focusedCoords}
      />
    </Flex>
  )
}

export default GrowthGroups
