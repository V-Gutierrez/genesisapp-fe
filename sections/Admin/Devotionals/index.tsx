import {
  Box, Button, Flex, useDisclosure,
} from '@chakra-ui/react';

import { AiFillPlusCircle } from 'react-icons/ai';
import DevotionalCreationModal from 'sections/Admin/Devotionals/components/DevotionalCreationModal';
import DevotionalDashCard from 'components/DevotionalDashCard';
import { GET_DEVOTIONALS } from 'services/queries';
import React from 'react';
import { inHours } from 'helpers/time';
import { useQuery } from 'react-query';

export default function Devotionals() {
  const { data } = useQuery('devotionals', GET_DEVOTIONALS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Flex justify="space-evenly" alignItems="center" wrap="wrap">
        {data?.data.map((devotional) => (
          <DevotionalDashCard
            key={devotional.id}
            authorName={devotional.author.name}
            title={devotional.title}
            content={devotional.body}
            scheduledTo={devotional.scheduledTo}
          />
        ))}
      </Flex>
      <DevotionalCreationModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
