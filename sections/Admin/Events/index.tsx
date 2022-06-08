import {
 Box, Button, Flex, Text, useDisclosure,
} from '@chakra-ui/react';

import { AiFillPlusCircle } from 'react-icons/ai';
import EventCreationModal from 'sections/Admin/Events/components/EventCreationModal';
import EventsDashCard from 'components/EventsDashCard';
import { GET_EXTERNAL_EVENTS } from 'services/queries';
import React from 'react';
import { inHours } from 'helpers/time';
import { isFuture } from 'date-fns';
import { useQuery } from 'react-query';
import { zonedTimeToUtc } from 'date-fns-tz';

export default function Events() {
  const { data, refetch } = useQuery('events', GET_EXTERNAL_EVENTS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const scheduledEvents = data?.data.filter((d) => isFuture(zonedTimeToUtc(new Date(d.scheduledTo), 'America/Sao_Paulo')));
  const releasedEvents = data?.data.filter(
    (d) => !isFuture(zonedTimeToUtc(new Date(d.scheduledTo), 'America/Sao_Paulo')),
  );

  if (!data || !scheduledEvents || !releasedEvents) return null;
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
{' '}
          <Box ml={{ base: 2 }}>
            <AiFillPlusCircle />
          </Box>
        </Button>
      </Flex>
      <Flex alignItems="center" flexDir="column" minH="200px">
        <Text fontSize={{ base: '18px' }} fontWeight="600" my={{ base: 4 }}>
          Agendados
        </Text>
        {!scheduledEvents.length && <Text my="10px">Não há eventos agendados</Text>}

        {scheduledEvents.map((event) => (
          <EventsDashCard {...event} refetch={refetch} />
        ))}

        <Text fontSize={{ base: '18px' }} fontWeight="600" my={{ base: 4 }}>
          Lançados
        </Text>
        {!releasedEvents.length && <Text my="10px">Não há eventos lançados</Text>}

        {releasedEvents.map((event) => (
          <EventsDashCard {...event} refetch={refetch} />
        ))}
      </Flex>
      <EventCreationModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
