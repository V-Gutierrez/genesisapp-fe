import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'

import { AiFillPlusCircle } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'
import DevotionalCreationModal from 'sections/Admin/Devotionals/components/DevotionalCreationModal'
import DevotionalDashCard from 'components/DevotionalDashCard'
import { GET_ADMIN_DEVOTIONALS } from 'services/queries'
import { inHours } from 'helpers/time'
import { isFuture } from 'date-fns'
import { useQuery } from 'react-query'
import { zonedTimeToUtc } from 'date-fns-tz'

export default function Devotionals() {
  const { data, refetch } = useQuery('admin-devotionals', GET_ADMIN_DEVOTIONALS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const scheduledDevotionals = data?.data.filter((d) => isFuture(zonedTimeToUtc(new Date(d.scheduledTo), 'America/Sao_Paulo')))
  const releasedDevotionals = data?.data.filter(
    (d) => !isFuture(zonedTimeToUtc(new Date(d.scheduledTo), 'America/Sao_Paulo')),
  )

  if (!data || !scheduledDevotionals || !releasedDevotionals) return null
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
          Criar Devocional
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
        {!scheduledDevotionals.length && <Text my="10px">Não há devocionais agendados</Text>}

        {scheduledDevotionals.map((devotional) => (
          <DevotionalDashCard key={devotional.id} {...devotional} refetch={refetch} />
        ))}

        <Text fontSize={{ base: '18px' }} fontWeight="600" my={{ base: 4 }}>
          Lançados
        </Text>
        {!releasedDevotionals.length && <Text my="10px">Não há devocionais lançados</Text>}

        {releasedDevotionals.map((devotional) => (
          <DevotionalDashCard {...devotional} refetch={refetch} />
        ))}
      </Flex>
      <DevotionalCreationModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
