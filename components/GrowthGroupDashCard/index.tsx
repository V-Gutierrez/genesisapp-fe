import { Button, Flex, Text, toast, useToast } from '@chakra-ui/react'
import OptionsButton from 'components/OptionsButton'
import { arrayToNaturalLanguage } from 'helpers/formatters'
import React, { useMemo } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { useMutation, useQuery } from 'react-query'
import { DELETE_GROWTH_GROUP } from 'services/mutations'
import { GET_GROWTH_GROUPS } from 'services/queries'

export default function GrowthGroupDashCard({ Group }: GrowthGroupDashCard) {
  const { mutateAsync: deleteGrowthGroup } = useMutation(DELETE_GROWTH_GROUP)
  const { refetch } = useQuery('admin-growthgroups', GET_GROWTH_GROUPS)

  const toast = useToast()
  const leaders = useMemo(() => arrayToNaturalLanguage(Group.leadership), [Group.leadership])

  const handleGrowthGroups = async () => {
    const userConfirmation = confirm('Deseja deletar esse grupo de crescimento?')

    if (!userConfirmation) return false
    try {
      await deleteGrowthGroup(Group.id)
      await refetch()

      toast({
        title: 'Grupo de crescimento deletado com sucesso',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Houve um erro ao deletar o grupo de crescimento',
        status: 'error',
      })
    }
  }

  return (
    <Flex
      scrollSnapAlign="start"
      marginBottom="10px"
      bg={'white'}
      color={'black'}
      w="70%"
      minW={'200px'}
      flexDirection="column"
      borderRadius="10px"
      padding={4}
      cursor="pointer"
      _hover={{
        bg: 'gray.900',
        color: 'white',
      }}
    >
      <Text fontSize={{ base: '14px' }} fontWeight="800">
        {Group.name}
      </Text>

      <Text fontSize={{ base: '14px' }}>{Group.addressInfo}</Text>
      <Text fontSize={{ base: '14px' }}>{leaders}</Text>
      <Flex align="center" justify="space-between" w="100%">
        <Text fontSize={{ base: '14px' }} mr="12px">
          {' '}
          Ás {Group.scheduledTime} - {Group.weekDay}
        </Text>
        <OptionsButton>
          <Button
            w="194px"
            variant="ghost"
            rightIcon={<AiOutlineDelete />}
            justifyContent="space-between"
            fontWeight="normal"
            colorScheme="red"
            fontSize="sm"
            onClick={handleGrowthGroups}
          >
            Excluir
          </Button>
        </OptionsButton>
      </Flex>
    </Flex>
  )
}
