import {
  Grid, GridItem, Stack, Text,
} from '@chakra-ui/react';

import { HiOutlineBookOpen } from 'react-icons/hi';
import OptionCard from 'components/OptionCard';
import React from 'react';
import StatsCard from 'sections/Admin/components/StatsCard';

const AdminOptions: Array<AdminOptions> = [
  { title: 'Devocionais', icon: HiOutlineBookOpen, goTo: '/admin/devocionais' },
];

export default function AdminDashboard() {
  return (
    <Grid
      h="80vh"
      templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)', lg: 'repeat(6, 1fr)' }}
      templateRows={{
        base: 'repeat(9, 1fr)',
        sm: 'repeat(6, 1fr)',
        md: 'repeat(8, 1fr)',
        lg: 'repeat(6, 1fr)',
      }}
      gap={{ base: '50px' }}
      d={{
        base: 'grid', sm: 'grid', md: 'grid', lg: 'grid', xl: 'grid',
      }}
    >
      <GridItem
        py="5px"
        colSpan={{ base: 3, sm: 5, lg: 3 }}
        rowSpan={{
          base: 3, sm: 2, md: 3, lg: 5,
        }}
        borderRadius="20px"
      >
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
      </GridItem>
      <GridItem
        colSpan={{ base: 3, sm: 5, lg: 3 }}
        rowSpan={{
          base: 5, sm: 3, md: 4, lg: 5,
        }}
        borderRadius="20px"
        py="5px"
      >
        <Text fontSize="18px" my="8px" fontWeight="600">
          Itens de edição
        </Text>
        <Stack
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
          {AdminOptions.map((item) => <OptionCard {...item} />)}
        </Stack>
      </GridItem>
    </Grid>
  );
}
