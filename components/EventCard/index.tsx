import { Box, Center, Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { useMemo } from 'react'

import Link from 'next/link'
import { formatToTimezone } from 'helpers/time'

export default function EventCard({
  id,
  eventDate,
  subscriptionsDueDate,
  title,
  maxSlots,
  _count,
}: EventItem) {
  const formattedEventDate = useMemo(
    () => formatToTimezone(eventDate, "dd 'de' MMMM 'de' yyyy 'às' HH:mm"),
    [eventDate],
  )
  const subscriptionsEndDate = useMemo(
    () => formatToTimezone(subscriptionsDueDate, "dd 'de' MMMM 'de' yyyy 'às' HH:mm"),
    [subscriptionsDueDate],
  )
  const remainingSlots = useMemo(() => maxSlots - _count.EventsSubscriptions, [maxSlots, _count])
  const isSubscriptionAvailable = remainingSlots > 0

  return (
    <Center py={6} cursor="pointer" userSelect="none" mx={2}>
      <Link
        href={isSubscriptionAvailable ? `/eventos/inscricoes/${id}` : '#'}
        legacyBehavior>
        <Box
          maxW={{ base: '370px' }}
          minH={{ base: '200px' }}
          w="full"
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow="xl"
          rounded="md"
          p={6}
          overflow="hidden"
        >
          <Stack>
            <Text
              textTransform="uppercase"
              fontWeight={800}
              color="blackAlpha.900"
              fontSize="sm"
              letterSpacing={1.1}
            >
              Evento
            </Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize="lg"
              fontFamily="body"
              minH="50px"
            >
              {title}
            </Heading>
          </Stack>
          <Stack mt={2} direction="row" spacing={4} align="center">
            <Stack direction="column" spacing={0} fontSize="sm">
              <Text fontWeight={600}> {formattedEventDate}</Text>
              <Text color="gray.500">Inscrições até {subscriptionsEndDate}</Text>
              <Flex align="center" pt={{ base: 2 }}>
                <Text color="gray.500">
                  {isSubscriptionAvailable
                    ? `${remainingSlots} vagas disponíveis`
                    : 'Inscrições encerradas'}
                </Text>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Link>
    </Center>
  );
}
