import DevotionalsSlider from 'sections/Home/components/DevotionalsSlider';
import { Flex } from '@chakra-ui/react';
import NewsSlider from 'sections/Home/components/NewsSlider';

export default function HomeSection() {
  return (
    <Flex flexDir="column" w="full" align="center">
      <NewsSlider />
      <DevotionalsSlider />
    </Flex>
  );
}
