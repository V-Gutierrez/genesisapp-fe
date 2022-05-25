import { Flex, Spinner } from '@chakra-ui/react';

import GroupCard from 'sections/GrowthGroups/components/GroupCard';
import React from 'react';

const GroupList: React.FC<GroupListProps> = ({ GCDataset, selectCoordsHandler, currentCoords }) => {
  if (!GCDataset || !GCDataset.length) {
    return (
      <Flex h="100%" w="20%" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  }
  return (
    <Flex
      scrollSnapType="y proximity"
      overflowY="scroll"
      h={{ base: '50%', md: '40%', lg: '100%' }}
      w={{
        base: '100%',
        sm: '100%',
        md: '100%',
        lg: '40%',
      }}
      padding="12px"
      mt={{
        lg: 0,
        md: '18px',
        sm: '18px',
        base: '18px',
      }}
      flexDir={{ base: 'column' }}
      sx={{
        '&::-webkit-scrollbar': {
          width: '5px',
          borderRadius: '15px',
          backgroundColor: 'gray.60',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'gray.800',
          height: '20px',
          borderRadius: '100px',
        },
        '&::-webkit-track': {
          h: '90%',
        },
      }}
    >
      {GCDataset.map((group) => (
        <GroupCard
          selectCoordsHandler={selectCoordsHandler}
          key={group.id}
          Group={group}
          active={currentCoords.lat === group.lat && currentCoords.lng === group.lng}
        />
      ))}
    </Flex>
  );
};

export default GroupList;
