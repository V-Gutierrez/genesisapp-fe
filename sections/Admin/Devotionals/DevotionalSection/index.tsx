import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

import { GET_DEVOTIONAL_BY_SLUG } from 'services/queries';
import NotFound from 'pages/404';
import { formatInTimeZone } from 'date-fns-tz';
import { pt } from 'date-fns/locale';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

export default function DevotionalSection() {
  const { query } = useRouter();
  const { slug: devotionalSlug } = query;
  const { data } = useQuery(
    [`devotional-${devotionalSlug}`, devotionalSlug],
    GET_DEVOTIONAL_BY_SLUG,
  );

  if (!data) {
    return <NotFound />;
  }

  const {
    title, body, author, scheduledTo,
  } = data.data;

  const formatedScheduledDate = useMemo(
    () => formatInTimeZone(
      new Date(scheduledTo),
      'America/Sao_Paulo',
      "' Em' dd 'de' MMMM 'de' yyyy 'às' HH:mm",
      { locale: pt },
    ),
    [scheduledTo],
  );

  return (
    <Container maxW="3xl">
      <Stack as={Box} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight="110%"
        >
          {title}
        </Heading>
        <Box dangerouslySetInnerHTML={{ __html: body }} />

        <Text fontFamily="Caveat" fontSize="lg">
          {formatedScheduledDate}
          {' '}
          por
          {' '}
          {author.name}
        </Text>
      </Stack>
    </Container>
  );
}
