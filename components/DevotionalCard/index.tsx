import {
 Box, Center, Heading, Image, Stack, Text, useColorModeValue,
} from '@chakra-ui/react'

import Link from 'next/link'
import { formatToTimezone } from 'helpers/time'
import { useMemo } from 'react'

export default function DevotionalCard({
 scheduledTo, author, title, slug,
}: Devotional) {
  const formatedScheduledDate = useMemo(() => formatToTimezone(scheduledTo), [scheduledTo])

  return (
    <Center py={6} cursor="pointer" userSelect="none" mx={2}>
      <Link href={`/devocionais/${slug}`}>
        <Box
          maxW={{ base: '300px' }}
          minW={{ base: '300px' }}
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
            </Stack>
          </Stack>
        </Box>
      </Link>
    </Center>
  )
}
