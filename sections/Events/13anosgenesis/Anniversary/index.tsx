import { Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import AnniversaryBanner from 'public/assets/images/13anosgenesis.jpg'
import { Brazil } from 'styles/clipPaths'
import GoogleImagesGallery from 'components/GoogleImagesGallery'
import Head from 'next/head'
import NextImage from 'components/NextImage'

const AnniversarySection: React.FC = () => {
  const [showFullGallery, setShowFullGallery] = useState(true)
  const galleryWarning = useBreakpointValue({
    base: 'TOQUE NA TELA PARA VOLTAR',
    md: 'CLIQUE PARA VOLTAR',
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const delay = setTimeout(() => {
        clearTimeout(delay)
        setShowFullGallery(false)
      }, 1000)
    }
  }, [])

  const computeStylesBasedOnShowFullGalleryState = <T, K>(
    showFullGalleryState: boolean,
    truthyStyle: T,
    falsyStyle: K,
  ) => (showFullGalleryState ? truthyStyle : falsyStyle)

  return (
    <>
      <Head>
        <title>Gênesis Church - Aniversário 13 anos</title>
      </Head>
      <Flex
        minH="100vh"
        flexDirection="column"
        bg="black"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPos="center"
        alignItems="center"
      >
        <NextImage
          ImageProps={{
            src: AnniversaryBanner.src,
          }}
          BoxProps={{
            w: { base: '100%', sm: '100%', md: '100%', lg: '100%' },
            h: computeStylesBasedOnShowFullGalleryState(showFullGallery, 0, { base: '240px' }),
            transition: 'all 1.5s ease-in-out',
          }}
        />
        <Flex
          onClick={() => setShowFullGallery((prev) => !prev)}
          wrap="wrap"
          w={{ base: computeStylesBasedOnShowFullGalleryState(showFullGallery, 'full', '300px') }}
          h={{ base: computeStylesBasedOnShowFullGalleryState(showFullGallery, '1000px', '300px') }}
          clipPath={computeStylesBasedOnShowFullGalleryState(showFullGallery, 'none', Brazil)}
          transition="all 2.5s ease-in-out"
          flexDirection="column"
          mt={{ base: '20px' }}
        >
          <GoogleImagesGallery
            FlexProps={{
              w: 'full',
              align: 'center',
              justify: 'center',
              flexWrap: 'wrap',
              transition: 'all 2.5s ease-in-out',
              overflow: computeStylesBasedOnShowFullGalleryState(
                showFullGallery,
                'visible',
                'hidden',
              ),
            }}
            queryKey="13YearsAnniversaryPhotos"
            albumUrl="https://photos.app.goo.gl/uUmT9uEH6GeJtsoK9"
            imageBlockWidth={{
              base: computeStylesBasedOnShowFullGalleryState(showFullGallery, '75px', '25px'),
              md: '45px',
            }}
            imageBlockHeight={{
              base: computeStylesBasedOnShowFullGalleryState(showFullGallery, '75px', '25px'),
              md: '45px',
            }}
          />
        </Flex>
        <Flex
          opacity={computeStylesBasedOnShowFullGalleryState(showFullGallery, '0', '1')}
          transition="all 1.5s ease-in-out"
          direction="column"
          justifyContent="center"
          w="full"
          textAlign="center"
          mt={{ base: '25px' }}
        >
          <Text color="white" fontSize={{ base: '16px' }} fontFamily="Caveat" px={{ base: '18px' }}>
            &ldquo; Mudaste o meu pranto em dança, a minha veste de lamento em veste de alegria,
            para que o meu coração cante louvores a ti e não se cale. Senhor, meu Deus, eu te darei
            graças para sempre. &rdquo; <br />
            <Text color="white" fontSize={{ base: '14px' }} mt={{ base: '5px' }}>
              Salmos 30:11-12
            </Text>
          </Text>
        </Flex>
      </Flex>
      {showFullGallery && (
        <Flex
          pos="fixed"
          transition="all 3.5s ease-in-out"
          bottom="0"
          w="full"
          py="2px"
          bgColor="blackAlpha.500"
          textAlign="center"
          justify="center"
          align="center"
        >
          <Text color="white" fontSize={{ base: '12px' }}>
            {galleryWarning}
          </Text>
        </Flex>
      )}
    </>
  )
}

export default AnniversarySection
