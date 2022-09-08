import { AiOutlineArrowsAlt, AiOutlineDelete } from 'react-icons/ai'
import { FaSignature } from 'react-icons/fa'
import { Box, Button, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useMemo } from 'react'

import { DELETE_EVENT } from 'services/mutations'
import OptionsButton from 'components/OptionsButton'

import { formatToTimezone } from 'helpers/time'
import { isFuture, isPast } from 'date-fns'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import SubscribersModal from 'sections/Admin/Events/components/SubscribersModal'

const EventDashCard: React.FC<EventCardProps> = ({
  title,
  id,
  refetch,
  eventDate,
  subscriptionsDueDate,
  subscriptionsScheduledTo,
  maxSlots,
  EventsSubscriptions,
  _count,
}) => {
  const { mutateAsync: deleteEvent } = useMutation(DELETE_EVENT)
  const toast = useToast()
  const { push } = useRouter()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const formattedEventDate = useMemo(
    () => formatToTimezone(eventDate, "dd 'de' MMMM 'de' yyyy 'às' HH:MM"),
    [eventDate],
  )
  const subscriptionsEndDate = useMemo(
    () => formatToTimezone(subscriptionsDueDate, "dd 'de' MMMM 'de' yyyy 'às' HH:MM'"),
    [subscriptionsDueDate],
  )
  const subscriptionsStartDate = useMemo(
    () => formatToTimezone(subscriptionsScheduledTo, "dd 'de' MMMM 'de' yyyy 'às' HH:MM'"),
    [subscriptionsScheduledTo],
  )
  const remainingSlots = useMemo(() => maxSlots - _count?.EventsSubscriptions, [maxSlots, _count])

  const handleSeeEvent = () => {
    push(`/eventos/inscricoes/${id}`)
  }

  const handleEventDelete = async () => {
    const userConfirmation = confirm('Deseja deletar esse evento?')

    if (!userConfirmation) return false

    try {
      await deleteEvent(id)
      await refetch()

      toast({
        title: 'Evento deletado com sucesso',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Houve um erro ao deletar o evento',
        status: 'error',
      })
    }
  }

  const handleSeeSubscribers = () => {
    onOpen()
  }

  return (
    <Flex
      boxShadow="lg"
      my={{ base: 2 }}
      maxW="640px"
      direction={{ base: 'column-reverse', md: 'row' }}
      width="full"
      rounded="xl"
      p={12}
      justifyContent="space-between"
      position="relative"
    >
      <Flex direction="column" textAlign="left" justifyContent="space-between">
        <Text fontWeight="medium" align="center" mb={{ base: '20px' }}>
          {title}
        </Text>
        <Box
          fontSize="14px"
          pb={7}
          mr={3}
          maxHeight="110px"
          textOverflow="ellipsis"
          wordBreak="break-word"
          cursor="pointer"
        >
          <Text>Data do evento: {formattedEventDate}</Text>
          <Text>Data de ínicio da inscrições: {subscriptionsStartDate}</Text>
          <Text>Data de fim da inscrições: {subscriptionsEndDate}</Text>
          <Text mt={2}>Inscritos: {_count?.EventsSubscriptions}</Text>
          <Text> Vagas Disponíveis: {remainingSlots}</Text>
          <Text>Vagas Totais: {maxSlots}</Text>
        </Box>
      </Flex>

      <Box pos="absolute" top="0px" right="15px">
        <OptionsButton noBackground>
          {isPast(new Date(subscriptionsScheduledTo)) && isFuture(new Date(eventDate)) && (
            <>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<AiOutlineArrowsAlt />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="blackAlpha.700"
                fontSize="sm"
                onClick={handleSeeEvent}
              >
                Ver na íntegra
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<FaSignature />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="blackAlpha.700"
                fontSize="sm"
                onClick={handleSeeSubscribers}
              >
                Ver inscritos
              </Button>
            </>
          )}
          <Button
            w="194px"
            variant="ghost"
            rightIcon={<AiOutlineDelete />}
            justifyContent="space-between"
            fontWeight="normal"
            colorScheme="red"
            fontSize="sm"
            onClick={handleEventDelete}
          >
            Excluir
          </Button>
        </OptionsButton>
        <SubscribersModal
          subscribers={EventsSubscriptions as EventsSubscription[]}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
    </Flex>
  )
}

export default EventDashCard
