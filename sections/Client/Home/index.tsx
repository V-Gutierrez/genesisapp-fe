import { Flex } from '@chakra-ui/react'
import DevotionalsSlider from 'sections/Client/Home/components/DevotionalsSlider'
import NewsHighlightsSlider from 'sections/Client/Home/components/NewsHighlightsSlider'
import Welcome from 'sections/Client/Home/components/Welcome'

export default function HomeSection() {
  return (
    <Flex flexDir="column" w="full" align="center">
      <Welcome />
      <NewsHighlightsSlider />
      <DevotionalsSlider />
    </Flex>
  )
}
