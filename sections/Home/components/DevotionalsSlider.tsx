import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useEffect, useState } from 'react';

import DevotionalCard from 'components/DevotionalCard';
import { GET_USER_DEVOTIONALS } from 'services/queries';
import { inHours } from 'helpers/time';
import { useQuery } from 'react-query';

const DevotionalsSlider: React.FC = () => {
  const { data } = useQuery('devotionals', GET_USER_DEVOTIONALS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  });
  const [arrowVisibility, setArrowVisibility] = useState({ left: false, right: true });

  useEffect(() => {
    const slider = document.getElementById('scrollableSlider');

    if (slider) {
      const isOverflowing = slider!.scrollHeight > slider!.clientHeight || slider!.scrollWidth > slider!.clientWidth;
      setArrowVisibility({ left: isOverflowing, right: isOverflowing });
    }
  }, [data]);

  const handleSwipeRight = () => {
    const slider = document.getElementById('scrollableSlider');

    slider!.scrollLeft += 300;
    const scrolledDistance = slider!.scrollWidth - slider!.scrollLeft;

    if (scrolledDistance === slider?.clientWidth) {
      setArrowVisibility({ left: true, right: false });
    } else {
      setArrowVisibility({ left: true, right: true });
    }
  };
  const handleSwipeLeft = () => {
    const slider = document.getElementById('scrollableSlider');

    slider!.scrollLeft -= 300;

    if (slider?.scrollLeft === 0) {
      setArrowVisibility({ left: false, right: true });
    } else {
      setArrowVisibility({ left: true, right: true });
    }
  };

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
        scrollBehavior="smooth"
        id="scrollableSlider"
        minW="100%"
        px={{ base: 2 }}
        scrollSnapType="y proximity"
        overflowX="scroll"
        align="center"
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
        {arrowVisibility.left
          && (
            <Box d={{ base: 'none', sm: 'initial' }} pos="fixed" left={{ base: 2 }} onClick={handleSwipeLeft} cursor="pointer">
              <BsChevronLeft />
            </Box>
          )}
        {data?.data.map((devotional) => (
          <Flex mx={{ base: 1 }} key={devotional.id} alignItems="center" justifyContent="center" scrollSnapAlign="start">
            <DevotionalCard {...devotional} />
          </Flex>
        ))}
        {arrowVisibility.right
          && (
            <Box d={{ base: 'none', sm: 'initial' }} pos="fixed" right={{ base: 2 }} onClick={handleSwipeRight} cursor="pointer">
              <BsChevronRight />
            </Box>
          )}
      </Flex>
    </Box>
  );
};

export default DevotionalsSlider;
