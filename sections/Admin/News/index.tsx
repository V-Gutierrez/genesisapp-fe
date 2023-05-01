import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'

import { AiFillPlusCircle } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'
import { GET_ADMIN_NEWS } from 'services/queries'
import NewsCreationModal from 'sections/Admin/News/components/NewsCreationModal'
import NewsDashCard from 'components/NewsDashCard'
import { inHours } from 'helpers/time'
import { isFuture } from 'date-fns'
import { useQuery } from 'react-query'
import { zonedTimeToUtc } from 'date-fns-tz'

export default function News() {
  const { data, refetch } = useQuery('admin-news', GET_ADMIN_NEWS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const scheduledNews = data?.data.filter((d) => isFuture(zonedTimeToUtc(new Date(d.scheduledTo), 'America/Sao_Paulo')))
  const releasedNews = data?.data.filter(
    (d) => !isFuture(zonedTimeToUtc(new Date(d.scheduledTo), 'America/Sao_Paulo')),
  )

  if (!data || !scheduledNews || !releasedNews) return null
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
          Criar Notícia
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
        {!scheduledNews.length && <Text my="10px">Não há notícias agendadas</Text>}

        {scheduledNews.map((news) => (
          <NewsDashCard {...news} refetch={refetch} />
        ))}

        <Text fontSize={{ base: '18px' }} fontWeight="600" my={{ base: 4 }}>
          Lançados
        </Text>
        {!releasedNews.length && <Text my="10px">Não há notícias lançadas</Text>}

        {releasedNews.map((news) => (
          <NewsDashCard {...news} refetch={refetch} />
        ))}
        <NewsCreationModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
  )
}
