import { Stack, Text } from '@chakra-ui/react';

import { HiOutlineBookOpen } from 'react-icons/hi';
import OptionCard from 'components/OptionCard';
import React from 'react';

const AdminOptions: Array<AdminOptions> = [
  { title: 'Devocionais', icon: HiOutlineBookOpen, goTo: '/admin/devocionais' },
];

function DashboardOptions() {
  return (
    <>
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
        {AdminOptions.map((item) => (
          <OptionCard {...item} />
        ))}
      </Stack>
    </>
  );
}

export default DashboardOptions;
