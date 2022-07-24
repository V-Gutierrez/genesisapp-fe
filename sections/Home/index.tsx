import DevotionalsSlider from 'sections/Home/components/DevotionalsSlider'
import { Flex } from '@chakra-ui/react'
import NewsHighlightsSlider from 'sections/Home/components/NewsHighlightsSlider'

export default function HomeSection() {
  return (
    <Flex flexDir="column" w="full" align="center">
      <NewsHighlightsSlider />
      <DevotionalsSlider />
    </Flex>
  )
}
