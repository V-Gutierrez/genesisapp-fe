import {
  Box,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { useMemo, useRef } from 'react'

import { BsClock } from 'react-icons/bs'
import Link from 'next/link'
import { formatToTimezone } from 'helpers/time'

export default function DevotionalCard({
  scheduledTo,
  author,
  title,
  slug,
  readingTimeInMinutes,
}: Devotional) {
  const formatedScheduledDate = useMemo(() => formatToTimezone(scheduledTo), [scheduledTo])
  const iconRef = useRef(null)
  return (
    <Center py={6} cursor="pointer" userSelect="none" mx={2}>
      <Link href={`/devocionais/${slug}`} legacyBehavior>
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
              Devocional
            </Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize="2xl"
              fontFamily="body"
            >
              {title}
            </Heading>
          </Stack>
          <Stack mt={12} direction="row" spacing={4} align="center">
            <Stack direction="column" spacing={0} fontSize="sm">
              <Text fontWeight={600}>{author}</Text>
              <Text color="gray.500">{formatedScheduledDate}</Text>
              <Flex align="center" pt={{ base: 2 }}>
                <Tooltip label="Tempo de leitura" placement="top" hasArrow>
                  <Box ref={iconRef}>
                    <BsClock />
                  </Box>
                </Tooltip>{' '}
                <Text ml={{ base: 1 }} color="gray.500">
                  {' '}
                  {readingTimeInMinutes} min{' '}
                </Text>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Link>
    </Center>
  );
}
