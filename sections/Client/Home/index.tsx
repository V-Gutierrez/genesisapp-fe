import { Flex } from '@chakra-ui/react'
import DevotionalsSlider from 'sections/Client/Home/components/DevotionalsSlider'
import NewsHighlightsSlider from 'sections/Client/Home/components/NewsHighlightsSlider'

export default function HomeSection() {
  return (
    <Flex flexDir="column" w="full" align="center">
      <NewsHighlightsSlider />
      <DevotionalsSlider />
    </Flex>
  )
}
