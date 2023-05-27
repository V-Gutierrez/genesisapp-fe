import { Box, Flex } from '@chakra-ui/react'
import { inHours } from 'helpers/time'
import React from 'react'
import { GET_USER_NEWS } from 'services/queries'
import { useQuery } from 'react-query'
import CustomSlider from 'components/CustomSlider'
import NewsHighlightCard from 'components/NewsHighlightCard'
import Welcome from './Welcome'

const NewsHighlightsSlider: React.FC = () => {
  const { data } = useQuery('news', GET_USER_NEWS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  })

  if (!data || !data.data.length) return null
  return (
    <Box w="100%" p={{ md: 6 }} pb={{ base: 8, md: 0 }}>
      <Welcome />
      <Flex w="full" scrollBehavior="smooth" minW="100%" align="center">
        <CustomSlider
          customSettings={{
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '0.5px',
            autoplay: true,
            arrows: false,
            dots: true,
            speed: 5000,
          }}
        >
          {data?.data.map((news) => (
            <NewsHighlightCard {...news} key={news.id} />
          ))}
        </CustomSlider>
      </Flex>
    </Box>
  )
}

export default NewsHighlightsSlider
