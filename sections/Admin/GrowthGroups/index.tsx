import { Flex, Button, Box, useDisclosure } from '@chakra-ui/react';
import GrowthGroupCard from 'components/GrowthGroupCard';
import GrowthGroupDashCard from 'components/GrowthGroupDashCard';
import { inHours } from 'helpers/time';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { useQuery } from 'react-query';
import GrowthGroupsCreationModal from 'sections/Admin/GrowthGroups/components/GrowthGroupsCreationModal';
import { GET_GROWTH_GROUPS } from 'services/queries';

export default function GrowthGroups() {
  const { data, refetch } = useQuery('admin-growthgroups', GET_GROWTH_GROUPS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!data?.data.length) return null
  return (
    <Box>
      <Flex w="full" justify="center" my={{ base: 4 }}>
        <Button
          bg="blackAlpha.900"
          color="white"
          alignContent="center"
          justifyContent="space-between"
          d="flex"
          onClick={onOpen}
        >
          Inserir Grupo de Crescimento
          <Box ml={{ base: 2 }}>
            <AiFillPlusCircle />
          </Box>
        </Button>
        <Button
          bg="blackAlpha.900"
          color="white"
          ml={{ base: 1 }}
          alignContent="center"
          justifyContent="space-between"
          d="flex"
          onClick={() => refetch()}
        >
          Atualizar
          <Box ml={{ base: 2 }}>
            <BiRefresh />
          </Box>
        </Button>
      </Flex>

      <Flex alignItems="center" flexDir="column" minH="200px">
        {data.data.map((group) => (
          <GrowthGroupDashCard key={group.id} Group={group} />))}
      </Flex>
      <GrowthGroupsCreationModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )

}