import EventPhotoBG from 'public/assets/images/13anosgenesis/background13anos.png'
import { Flex } from '@chakra-ui/react'
import { GET_GOOGLE_PHOTOS_ALBUM_PHOTOS } from 'services/queries'
import Head from 'next/head'
import NextImage from 'components/NextImage'
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
        flexDirection="row"
      >
        {data?.data?.map((photo) => (
          <NextImage
            key={photo.uid}
            ImageProps={{ src: photo.thumbnail, objectFit: 'cover' }}
            BoxProps={{ width: '150px', height: '150px', margin: '.5px', borderRadius: 'lg' }}
          />
        ))}
      </Flex>
    </>
  )
}

export default AnniversarySection
