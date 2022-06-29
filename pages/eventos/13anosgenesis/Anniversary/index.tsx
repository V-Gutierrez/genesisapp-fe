import { Flex } from '@chakra-ui/react'
import { GET_GOOGLE_PHOTOS_ALBUM_PHOTOS } from 'services/queries'
import Head from 'next/head'
import ImageCard from 'pages/eventos/13anosgenesis/Anniversary/ImageCard'
import React from 'react'
import { useQuery } from 'react-query'

const AnniversarySection: React.FC = () => {
  const { data } = useQuery(
    ['13YearsAnniversaryPhotos', 'https://photos.app.goo.gl/uUmT9uEH6GeJtsoK9'],
    GET_GOOGLE_PHOTOS_ALBUM_PHOTOS,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  )

  return (
    <>
      <Head>
        <title>Gênesis Church - Aniversário 13 anos</title>
      </Head>
      <Flex
        minH="99vh"
        w="full"
        bgSize="cover"
        bg="black"
        align="center"
        justify="center"
        bgPos="center"
        scrollSnapType="y mandatory"
        flexWrap="wrap"
        overflow="auto"
      >
        {data?.data.map((photo) => (
          <ImageCard key={photo.uid} photo={photo} />
        ))}
      </Flex>
    </>
  )
}

export default AnniversarySection
