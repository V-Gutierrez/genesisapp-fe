import { Stack, Text } from '@chakra-ui/react';

import React from 'react';
import StatsCard from 'sections/Admin/components/StatsCard';

export default function Stats() {
  return (
    <>
      <Text fontSize="18px" my="8px" fontWeight="600">
        Estatísticas
      </Text>
      <Stack
        w="full"
        maxW="100%"
        d="flex"
        flexDir={{ base: 'column' }}
        overflowY="scroll"
        maxH="100%"
        scrollSnapType="y proximity"
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
        <StatsCard title="Usuários Ativos" stat="0" />
        <StatsCard title="Devocionais Publicados" stat="0" />
        <StatsCard title="Grupos de crescimento" stat="0" />
      </Stack>
    </>
  );
}
