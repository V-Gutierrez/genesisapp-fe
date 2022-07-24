import { Skeleton, Stack, Text } from '@chakra-ui/react'

import { GET_STATS } from 'services/queries'
import StatsCard from 'sections/Admin/components/StatsCard'
import { useQuery } from 'react-query'

export default function Stats() {
  const { data } = useQuery('stats', GET_STATS)

  if (!data) return <Skeleton h="200px" />
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
        <StatsCard title="Usuários Ativos" stat={data?.data.activeUsers} />
        <StatsCard title="Devocionais Publicados" stat={data?.data.devotionals} />
        <StatsCard title="Notícias publicadas" stat={data?.data.news} />
        <StatsCard title="Grupos de crescimento" stat={data?.data.growthGroups} />
      </Stack>
    </>
  )
}
