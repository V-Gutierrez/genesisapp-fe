import { Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { Brazil } from 'styles/clipPaths'
import GoogleImagesGallery from 'components/GoogleImagesGallery'
import Head from 'next/head'

const AnniversarySection: React.FC = () => {
  const [showFullGallery, setShowFullGallery] = useState(true)
  const galleryWarning = useBreakpointValue({
    base: 'TOQUE AQUI PARA VOLTAR',
    md: 'CLIQUE AQUI PARA VOLTAR',
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
        justify="space-evenly"
        overflowX="hidden"
      >
        <Flex
          onClick={() => setShowFullGallery(true)}
          wrap="wrap"
          w={{
            base: computeStylesBasedOnShowFullGalleryState(showFullGallery, 'full', '350px'),
            sm: computeStylesBasedOnShowFullGalleryState(showFullGallery, 'full', '500px'),
            md: computeStylesBasedOnShowFullGalleryState(showFullGallery, 'full', '550px'),
            lg: computeStylesBasedOnShowFullGalleryState(showFullGallery, 'full', '600px'),
            xl: computeStylesBasedOnShowFullGalleryState(showFullGallery, 'full', '800px'),
          }}
          h={{
            base: computeStylesBasedOnShowFullGalleryState(showFullGallery, '1300px', '330px'),
            sm: computeStylesBasedOnShowFullGalleryState(showFullGallery, '2000px', '450px'),
            md: computeStylesBasedOnShowFullGalleryState(showFullGallery, '2000px', '500px'),
            lg: computeStylesBasedOnShowFullGalleryState(showFullGallery, '2000px', '570px'),
            xl: computeStylesBasedOnShowFullGalleryState(showFullGallery, '2000px', '700px'),
          }}
          clipPath={computeStylesBasedOnShowFullGalleryState(showFullGallery, 'none', Brazil)}
          transition="all 2.5s ease-in-out"
          flexDirection="column"
          mt={{ base: '10px' }}
        >
          <GoogleImagesGallery
            FlexProps={{
              w: 'full',
              align: 'center',
              justify: 'center',
              flexWrap: 'wrap',
              bg: 'black',
              paddingBottom: '20px',
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
              sm: computeStylesBasedOnShowFullGalleryState(showFullGallery, '175px', '45px'),
            }}
            imageBlockHeight={{
              base: computeStylesBasedOnShowFullGalleryState(showFullGallery, '75px', '25px'),
              sm: computeStylesBasedOnShowFullGalleryState(showFullGallery, '175px', '45px'),
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
        >
          <Text
            color="white"
            fontSize={{ base: '16px', sm: '18px', md: '20px', lg: '22px' }}
            fontFamily="Caveat"
            px={{ base: '18px', sm: '48px', md: '50px', lg: '20%', xl: '25%' }}
          >
            &ldquo; Mudaste o meu pranto em dança, a minha veste de lamento em veste de alegria,
            para que o meu coração cante louvores a ti e não se cale. Senhor, meu Deus, eu te darei
            graças para sempre. &rdquo; <br />
          </Text>
          <Text color="white" fontFamily="Caveat" fontSize={{ base: '14px' }} mt={{ base: '5px' }}>
            Salmos 30:11-12
          </Text>
        </Flex>
      </Flex>

      <Flex
        opacity={computeStylesBasedOnShowFullGalleryState(showFullGallery, '1', '0')}
        pos="fixed"
        transition="all 1.5s ease-in-out"
        bottom="0"
        w="full"
        py={{ base: '6px' }}
        bgColor="blackAlpha.500"
        textAlign="center"
        justify="center"
        align="center"
        onClick={() => setShowFullGallery(false)}
      >
        <Text color="white" fontSize={{ base: '12px' }}>
          {galleryWarning}
        </Text>
      </Flex>
    </>
  )
}

export default AnniversarySection
