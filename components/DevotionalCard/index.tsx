import {
 Avatar, Box, Center, Heading, Stack, Text, useColorModeValue,
} from '@chakra-ui/react';

import Link from 'next/link';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useMemo } from 'react';

export default function DevotionalCard({
 scheduledTo, author, body, title, slug,
}: Devotional) {
  const formatedScheduledDate = useMemo(
    () => format(new Date(scheduledTo), "'em' dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
        locale: pt,
      }),
    [scheduledTo],
  );

  return (
    <Center py={6} cursor="pointer">
      <Link href={`/devocionais/${encodeURIComponent(slug)}`}>
        <Box
          maxW="445px"
          minH={{ base: '308px' }}
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
            <Text color="gray.500" noOfLines={3} dangerouslySetInnerHTML={{ __html: body }} />
          </Stack>
          <Stack mt={6} direction="row" spacing={4} align="center">
            <Avatar bg="blackAlpha.900" name={author?.name} />
            <Stack direction="column" spacing={0} fontSize="sm">
              <Text fontWeight={600}>{author?.name}</Text>
              <Text color="gray.500">{formatedScheduledDate}</Text>
            </Stack>
          </Stack>
        </Box>
      </Link>
    </Center>
  );
}
