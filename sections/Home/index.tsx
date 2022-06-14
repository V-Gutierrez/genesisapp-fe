import DevotionalsSlider from 'sections/Home/components/DevotionalsSlider'
import { Flex } from '@chakra-ui/react'

export default function HomeSection() {
  return (
    <Flex flexDir="column" w="full" align="center">
      <DevotionalsSlider />
    </Flex>
  )
}
