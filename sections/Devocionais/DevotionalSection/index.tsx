import {
  Box,
  Container,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';

import { GET_DEVOTIONAL_BY_SLUG } from 'services/queries';
import Head from 'next/head';
import Image from 'next/image';
import NextImage from 'components/NextImage';
import NotFound from 'pages/404';
import { formatToTimezone } from 'helpers/time';
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
    title, body, author, scheduledTo, coverImage,
  } = data.data;

  const formatedScheduledDate = useMemo(
    () => formatToTimezone(scheduledTo, "' Em' dd 'de' MMMM 'de' yyyy 'às' HH:mm"),
    [scheduledTo],
  );

  return (
    <>
      <Head>
        <title>
Gênesis Church - Devocionais |
{title}
{' '}
de
{author}
</title>
      </Head>
      <Flex flexDir="column" w="100%" overflow="clip" align="center">
        <NextImage
          ImageProps={{
            src: coverImage,
            priority: true,
            objectFit: 'cover',
          }}
          BoxProps={{
            w: '100%',
            h: { base: '200px', md: '300px' },
            borderRadius: 'xl',
            overflow: 'hidden',
          }}
        />
        <Container maxW="3xl">
          <Stack as={Box} spacing={{ base: 8, md: 14 }} py={{ base: 5, md: 10 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight="100%"
            >
              {title}
            </Heading>
            <Box dangerouslySetInnerHTML={{ __html: body }} maxW="100%" />

            <Text fontFamily="Caveat" fontSize="lg">
              {formatedScheduledDate}
              {' '}
              por
              {` ${author}`}
            </Text>
          </Stack>
        </Container>
      </Flex>
    </>
  );
}
