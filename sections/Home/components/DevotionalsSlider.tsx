import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';

import DevotionalCard from 'components/DevotionalCard';
import { GET_USER_DEVOTIONALS } from 'services/queries';
import { inHours } from 'helpers/time';
import { useQuery } from 'react-query';

const DevotionalsSlider: React.FC = () => {
  const { data } = useQuery('devotionals', GET_USER_DEVOTIONALS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  });

  if (!data || !data.data.length) return null;

  return (
    <Box w="100%" p={{ md: 6 }}>
      <Text
        fontSize={{ base: '26px' }}
        paddingLeft={{ base: 0, sm: 4 }}
        m={0}
        textAlign={{ base: 'center', sm: 'initial' }}
      >
        Devocionais
      </Text>
      <Flex
        w="full"
        minW="100%"
        scrollSnapType="y proximity"
        overflowX="scroll"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '&::-webkit-scrollbar-track': {
            display: 'none',
          },
          '&::-webkit-scrollbar-thumb': {
            display: 'none',
          },
        }}
      >
        {data?.data.map((devotional) => (
          <Flex mx={{ base: 1 }} alignItems="center" justifyContent="center">
            <DevotionalCard key={devotional.id} {...devotional} />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default DevotionalsSlider;
