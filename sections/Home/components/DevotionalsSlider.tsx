import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react'

import CustomSlider from 'components/CustomSlider'
import DevotionalCard from 'components/DevotionalCard'
import { GET_USER_DEVOTIONALS } from 'services/queries'
import { inHours } from 'helpers/time'
import { useQuery } from 'react-query'

const DevotionalsSlider: React.FC = () => {
  const { data } = useQuery('devotionals', GET_USER_DEVOTIONALS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  })
  const slides = useBreakpointValue({
    base: 1,
    md: 2,
    lg: 3,
    xl: 4,
    '2xl': 6,
  })

  if (!data || !data.data.length) return null
  return (
    <Box w="100%" p={{ md: 6 }} pb={{ base: 8, md: 0 }}>
      <Text
        fontSize={{ base: '20px' }}
        paddingLeft={{ base: 4, sm: 4 }}
        m={0}
        textAlign={{ base: 'initial', sm: 'initial' }}
      >
        Devocionais
      </Text>
      <Flex w="full" scrollBehavior="smooth" minW="100%" align="center">
        <CustomSlider
          customSettings={{
            slidesToShow: slides,
            centerMode: true,
            centerPadding: '.5px',
            autoplay: false,
            arrows: false,
          }}
        >
          {data?.data.map((devotional) => (
            <DevotionalCard key={devotional.id} {...devotional} />
          ))}
        </CustomSlider>
      </Flex>
    </Box>
  )
}

export default DevotionalsSlider
