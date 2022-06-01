import {
 Box, Flex, Text, useBreakpointValue,
} from '@chakra-ui/react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import { Carousel } from '@trendyol-js/react-carousel';
import DevotionalCard from 'components/DevotionalCard';
import { GET_USER_DEVOTIONALS } from 'services/queries';
import { inHours } from 'helpers/time';
import { useQuery } from 'react-query';

const DevotionalsSlider: React.FC = () => {
  const { data } = useQuery('devotionals', GET_USER_DEVOTIONALS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  });
  const show = useBreakpointValue({
 base: 1, sm: 2, md: 3, lg: 4,
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
      <Carousel
        show={show as number | 1}
        slide={1}
        swiping
        responsive
        infinite
        rightArrow={(
          <Flex h="100%" align="center">
            <BsChevronRight />
          </Flex>
        )}
        leftArrow={(
          <Flex h="100%" align="center">
            <BsChevronLeft />
          </Flex>
        )}
      >
        {data?.data.map((devotional) => (
          <Flex mx={{ base: 1 }} h="400px" alignItems="center" justifyContent="center">
            <DevotionalCard key={devotional.id} {...devotional} />
          </Flex>
        ))}
      </Carousel>
    </Box>
  );
};

export default DevotionalsSlider;
