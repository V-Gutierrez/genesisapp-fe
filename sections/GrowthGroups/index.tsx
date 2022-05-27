import React, { useState } from 'react';

import Axios from 'services/axios';
import { Flex } from '@chakra-ui/react';
import GroupList from 'sections/GrowthGroups/components/GroupList';
import { useQuery } from 'react-query';
import MapFrame from './components/MapFrame';

const Query = async () => Axios.get<GrowthGroup[]>('/growthGroups');

const GrowthGroups: React.FC = () => {
  const { data } = useQuery('growthGroups', Query, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const growthGroups = data?.data;
  const [focusedCoords, setFocusedCoords] = useState<CoordsState>({ lat: null, lng: null });

  function onSelectGroup(lat: number, lng: number) {
    setFocusedCoords({ lat, lng });
  }

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
  );
};

export default GrowthGroups;
