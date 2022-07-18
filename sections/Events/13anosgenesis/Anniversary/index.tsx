import { Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { Brazil } from 'styles/clipPaths'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import GenesisLogo from 'public/assets/images/genesislogowhite.png'
import GoogleImagesGallery from 'components/GoogleImagesGallery'
import Head from 'next/head'
import NextImage from 'components/NextImage'
import arrayShuffle from 'array-shuffle'
import { subscribers } from 'sections/Events/13anosgenesis/Anniversary/signers'
import { useRouter } from 'next/router'

const AnniversarySection: React.FC = () => {
  const [showFullGallery, setShowFullGallery] = useState(true)
  const galleryWarning = useBreakpointValue({
    base: 'TOQUE AQUI PARA VOLTAR',
    md: 'CLIQUE AQUI PARA VOLTAR',
  })
  const { push } = useRouter()

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
      <Flex w="100%" bg="black" h="60px" align="center" justify="flex-start">
        <ChevronLeftIcon
          cursor="pointer"
          color="white"
          h="40px"
          w="40px"
          onClick={() => push('/')}
        />
      </Flex>
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
        position="relative"
      >
        <Flex
          h="auto-fit"
          w="98vw"
          wrap="wrap"
          wordBreak="break-word"
          justify="space-around"
          align="center"
          position="absolute"
          zIndex="0"
          userSelect="none"
          bg="black"
          opacity={computeStylesBasedOnShowFullGalleryState(showFullGallery, '0', '1')}
        >
          {arrayShuffle(subscribers).map((signer) => (
            <Text
              fontFamily="Caveat"
              fontSize={{ base: '6px', sm: '7px', md: '8px', lg: '13px' }}
              w="auto-fit"
              key={signer.id}
              my=".5px"
              overflow="hidden"
              textAlign="center"
              maxW={{ base: '100px' }}
              maxH={{ base: '7px', sm: '11px', md: '12px', lg: '12px', xl: '22px' }}
            >
              {signer.name}
            </Text>
          ))}
        </Flex>
        <Flex
          h={computeStylesBasedOnShowFullGalleryState(showFullGallery, 0, '60px')}
          w="full"
          align="center"
          justifyContent="center"
          p={{ base: '5px' }}
        >
          <NextImage
            ImageProps={{
              src: GenesisLogo.src,
              alt: 'Genesis Logo',
              priority: true,
              objectFit: 'contain',
            }}
            BoxProps={{
              h: '100%',
              w: '140px',
              alignSelf: 'center',
            }}
          />
        </Flex>
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
            lg: computeStylesBasedOnShowFullGalleryState(showFullGallery, 'auto', '570px'),
            xl: computeStylesBasedOnShowFullGalleryState(showFullGallery, 'auto-fit', '700px'),
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
          zIndex="popover"
          mt={{ md: '20px' }}
        >
          <Text
            color="white"
            fontSize={{ base: '15px', sm: '15px', md: '18px', lg: '22px' }}
            px={{ base: '18px', sm: '48px', md: '50px', lg: '20%', xl: '25%' }}
          >
            &ldquo;Assim, pois, também agora, no tempo de hoje, sobrevive um remanescente segundo a
            eleição da graça.&rdquo;
            <br />
          </Text>
          <Text color="white" fontSize={{ base: '14px' }} mt={{ base: '5px' }}>
            Romanos 11:5
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
        bgColor="blackAlpha.400"
        h="20px"
        textAlign="center"
        justify="center"
        align="center"
        onClick={() => setShowFullGallery(false)}
        userSelect="none"
      >
        <Text color="white" fontSize={{ base: '12px' }}>
          {galleryWarning}
        </Text>
      </Flex>
    </>
  )
}

export default AnniversarySection
