import { AiOutlineDelete, AiOutlineUser } from 'react-icons/ai'
import {
 Box, Button, Flex, Text, chakra, useDisclosure, useToast,
} from '@chakra-ui/react'

import { DELETE_EXTERNAL_EVENT } from 'services/mutations'
import OptionsButton from 'components/OptionsButton'
import React from 'react'
import SubscribersModal from 'components/EventsDashCard/SubscribersModal'
import { useMutation } from 'react-query'

const EventsDashCard: React.FC<EventsDashCardProps> = ({
  title,
  id,
  refetch,
  subscriptions,
  maxSubscriptions,
  coverImage,
}) => {
  const { mutateAsync: deleteEvent } = useMutation(DELETE_EXTERNAL_EVENT)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const handleDevotionalDelete = async () => {
    try {
      await deleteEvent(id)
      await refetch()

      toast({
        title: 'Evento deletado com sucesso',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Houve um erro ao deletar o Evento',
        status: 'error',
      })
    }
  }

  return (
    <Flex
      boxShadow="lg"
      my={{ base: 2 }}
      maxW="640px"
      direction={{ base: 'column-reverse', md: 'row' }}
      width="full"
      rounded="xl"
      p={10}
      justifyContent="space-between"
      position="relative"
      bgPos="center"
      bgImage={coverImage}
    >
      <Flex direction="column" textAlign="left" justifyContent="space-between">
        <Box
          fontWeight="medium"
          fontSize="15px"
          pb={4}
          mr={3}
          maxHeight="auto"
          textOverflow="ellipsis"
          wordBreak="break-word"
          overflow="hidden"
          cursor="pointer"
        >
          <Flex pt={{ base: '20px' }} flexDir="column" align="flex-start" filter="invert(100%)">
            <chakra.p fontWeight="bold" fontSize={14} mixBlendMode="screen">
              {title}
            </chakra.p>

            <Text>
              Inscritos:
              {` ${subscriptions.length}`}
            </Text>
            <Text>
              Vagas:
              {` ${maxSubscriptions - subscriptions.length}`}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Box pos="absolute" top="0px" right="15px">
        <OptionsButton>
          <Button
            w="194px"
            variant="ghost"
            rightIcon={<AiOutlineUser />}
            justifyContent="space-between"
            fontWeight="normal"
            colorScheme="blackAlpha.900"
            fontSize="sm"
            onClick={onOpen}
          >
            Ver cadastrados
          </Button>
          <Button
            w="194px"
            variant="ghost"
            rightIcon={<AiOutlineDelete />}
            justifyContent="space-between"
            fontWeight="normal"
            colorScheme="red"
            fontSize="sm"
            onClick={() => {}}
            disabled
          >
            Excluir
          </Button>
        </OptionsButton>
      </Box>
      <SubscribersModal isOpen={isOpen} onClose={onClose} subscriptions={subscriptions} />
    </Flex>
  )
}

export default EventsDashCard
