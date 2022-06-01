import {
 Box, Button, Flex, Text, useDisclosure,
} from '@chakra-ui/react';

import { AiFillPlusCircle } from 'react-icons/ai';
import DevotionalCreationModal from 'sections/Admin/Devotionals/components/DevotionalCreationModal';
import DevotionalDashCard from 'components/DevotionalDashCard';
import { GET_DEVOTIONALS } from 'services/queries';
import { inHours } from 'helpers/time';
import { isFuture } from 'date-fns';
import { useQuery } from 'react-query';

export default function Devotionals() {
  const { data, refetch } = useQuery('devotionals', GET_DEVOTIONALS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const scheduledDevotionals = data?.data.filter((d) => isFuture(new Date(d.scheduledTo)));
  const releasedDevotionals = data?.data.filter((d) => !isFuture(new Date(d.scheduledTo)));

  if (!data || !scheduledDevotionals || !releasedDevotionals) return null;
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
        {!scheduledDevotionals.length && <Text my="10px">Não há devocionais agendados</Text>}

        {scheduledDevotionals.map((devotional) => (
          <DevotionalDashCard
            key={devotional.id}
            id={devotional.id}
            authorName={devotional.author.name}
            title={devotional.title}
            content={devotional.body}
            scheduledTo={devotional.scheduledTo}
            refetch={refetch}
            slug={devotional.slug}
          />
        ))}

        <Text fontSize={{ base: '18px' }} fontWeight="600" my={{ base: 4 }}>
          Lançados
        </Text>
        {!releasedDevotionals.length && <Text my="10px">Não há devocionais lançados</Text>}

        {releasedDevotionals.map((devotional) => (
          <DevotionalDashCard
            key={devotional.id}
            id={devotional.id}
            authorName={devotional.author.name}
            title={devotional.title}
            content={devotional.body}
            scheduledTo={devotional.scheduledTo}
            refetch={refetch}
            slug={devotional.slug}
          />
        ))}
      </Flex>
      <DevotionalCreationModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
