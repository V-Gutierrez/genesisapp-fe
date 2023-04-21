import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'

import { AiFillPlusCircle } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'
import { GET_ADMIN_EVENTS } from 'services/queries'
import { inHours } from 'helpers/time'
import { isFuture, isPast } from 'date-fns'
import { useQuery } from 'react-query'
import { zonedTimeToUtc } from 'date-fns-tz'
import EventCreationModal from 'sections/Admin/Events/components/EventCreationModal'
import EventDashCard from '../../../components/EventDashCard'

export default function Events() {
  const { data, refetch } = useQuery('admin-events', GET_ADMIN_EVENTS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const scheduledEvents = data?.data.filter(
    (d) =>
      isFuture(zonedTimeToUtc(new Date(d.subscriptionsScheduledTo), 'America/Sao_Paulo')) &&
      isFuture(zonedTimeToUtc(new Date(d.subscriptionsDueDate), 'America/Sao_Paulo')) &&
      isFuture(zonedTimeToUtc(new Date(d.eventDate), 'America/Sao_Paulo')),
  )
  const activeEvents = data?.data.filter(
    (d) =>
      isPast(zonedTimeToUtc(new Date(d.subscriptionsScheduledTo), 'America/Sao_Paulo')) &&
      !isPast(zonedTimeToUtc(new Date(d.subscriptionsDueDate), 'America/Sao_Paulo')) &&
      !isPast(zonedTimeToUtc(new Date(d.eventDate), 'America/Sao_Paulo')),
  )

  const pastEvents = data?.data.filter(
    (d) =>
      isPast(zonedTimeToUtc(new Date(d.subscriptionsScheduledTo), 'America/Sao_Paulo')) ||
      isPast(zonedTimeToUtc(new Date(d.subscriptionsDueDate), 'America/Sao_Paulo')) ||
      isPast(zonedTimeToUtc(new Date(d.eventDate), 'America/Sao_Paulo')),
  )

  if (!data || !scheduledEvents || !activeEvents || !pastEvents) return null
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
          Criar Evento
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
        <Text fontSize={{ base: '18px' }} fontWeight="600" my={{ base: 4 }}>
          Agendados
        </Text>
        {!scheduledEvents.length && <Text my="10px">Não há eventos agendados</Text>}

        {scheduledEvents.map((event) => (
          <EventDashCard {...event} refetch={refetch} />
        ))}

        <Text fontSize={{ base: '18px' }} fontWeight="600" my={{ base: 4 }}>
          Ativos
        </Text>
        {!activeEvents.length && <Text my="10px">Não há eventos ativos</Text>}

        {activeEvents.map((event) => (
          <EventDashCard {...event} refetch={refetch} />
        ))}
        <Text fontSize={{ base: '18px' }} fontWeight="600" my={{ base: 4 }}>
          Passados
        </Text>
        {!pastEvents.length && <Text my="10px">Não há eventos passados</Text>}

        {pastEvents.map((event) => (
          <EventDashCard {...event} refetch={refetch} />
        ))}
      </Flex>
      <EventCreationModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
