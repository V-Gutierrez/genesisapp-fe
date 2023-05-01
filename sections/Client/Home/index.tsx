import DevotionalsSlider from 'sections/Client/Home/components/DevotionalsSlider'
import { Flex, Text } from '@chakra-ui/react'
import NewsHighlightsSlider from 'sections/Client/Home/components/NewsHighlightsSlider'

export default function HomeSection() {
  return (
    <Flex flexDir="column" w="full" align="center">
      <Flex pl={{ base: 2, md: 5 }} alignSelf="flex-start" flexDirection="column" w="100%" fontSize={{ base: '2xl', sm: '4xl' }} textAlign={{ base: 'left' }} mb={{ base: 4, sm: 2 }}>
        <Text fontFamily="Caveat" fontSize={{ base: '32px', sm: '45px' }}>Bem-vindos</Text>
        <Text>à família Gênesis</Text>
      </Flex>

      <NewsHighlightsSlider />
      <DevotionalsSlider />
    </Flex>
  )
}
