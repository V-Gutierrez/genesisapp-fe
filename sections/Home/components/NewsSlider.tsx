import { Box, Flex, Text } from '@chakra-ui/react'

import AnniversaryNews from 'assets/images/inscricoes-festa.png'
import AnniversaryNewsMobile from 'assets/images/inscricoes-festa-mobile.png'
import CustomSlider from 'components/CustomSlider'
import NewsCard from 'components/NewsCard'
import React from 'react'

export default function NewsSlider() {
  /* WIP - NEWS CRUD */
  const staticnews: NewsCardProps[] = [
    {
      goTo: 'eventos/aniversário-13-anos-gênesis-church',
      imageSrc: AnniversaryNews.src,
      mobileImageSrc: AnniversaryNewsMobile.src,
    },
  ]

  return (
    <Box w="100%" p={{ md: 6 }} mb={{ base: '25px', md: 0 }}>
      <Text
        fontSize={{ base: '20px' }}
        paddingLeft={{ base: 4, sm: 4 }}
        m={0}
        mb={{ base: '24px' }}
        textAlign={{ base: 'initial', sm: 'initial' }}
      >
        Notícias
      </Text>
      <Flex w="full" scrollBehavior="smooth" minW="100%" align="center" justify="center">
        <CustomSlider
          customSettings={{
            slidesToShow: 1,
            centerMode: true,
            autoplay: true,
            centerPadding: '5px',
            arrows: false,
          }}
        >
          {staticnews.map((news) => (
            <NewsCard key={111} {...news} />
          ))}
        </CustomSlider>
      </Flex>
    </Box>
  )
}
