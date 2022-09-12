import { Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { Brazil } from 'styles/clipPaths'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import GenesisLogo from 'public/assets/images/genesislogowhite.png'
import GoogleImagesGallery from 'components/GoogleImagesGallery'
import Head from 'next/head'
import NextImage from 'components/NextImage'
import arrayShuffle from 'array-shuffle'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { GET_13TH_ANNIVERSARY_SUBSCRIBERS } from 'services/internalApiQueries'
import { computeStylesBasedOnState } from 'helpers/switches'

const AnniversarySection: React.FC = () => {
  const { data } = useQuery('anniversaryEventSubscribers', GET_13TH_ANNIVERSARY_SUBSCRIBERS)
  const subscribers = data?.data || []

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
        position="relative"
      >
        <Flex
          w="100%"
          zIndex="popover"
          d={computeStylesBasedOnState(showFullGallery, 'none', 'flex')}
          h="60px"
          align="center"
          justify="flex-start"
        >
          <ChevronLeftIcon
            cursor="pointer"
            color="white"
            h="40px"
            w="40px"
            onClick={() => push('/')}
          />
        </Flex>
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
          opacity={computeStylesBasedOnState(showFullGallery, '0', '1')}
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
          h={computeStylesBasedOnState(showFullGallery, 0, '60px')}
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
            base: computeStylesBasedOnState(showFullGallery, 'full', '350px'),
            sm: computeStylesBasedOnState(showFullGallery, 'full', '500px'),
            md: computeStylesBasedOnState(showFullGallery, 'full', '550px'),
            lg: computeStylesBasedOnState(showFullGallery, 'full', '600px'),
            xl: computeStylesBasedOnState(showFullGallery, 'full', '800px'),
          }}
          h={{
            base: computeStylesBasedOnState(showFullGallery, '1300px', '330px'),
            sm: computeStylesBasedOnState(showFullGallery, '2000px', '450px'),
            md: computeStylesBasedOnState(showFullGallery, '2000px', '500px'),
            lg: computeStylesBasedOnState(showFullGallery, 'auto', '570px'),
            xl: computeStylesBasedOnState(showFullGallery, 'auto-fit', '700px'),
          }}
          clipPath={computeStylesBasedOnState(showFullGallery, 'none', Brazil)}
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
              overflow: computeStylesBasedOnState(showFullGallery, 'visible', 'hidden'),
            }}
            queryKey="13YearsAnniversaryPhotos"
            albumUrl="https://photos.app.goo.gl/uUmT9uEH6GeJtsoK9"
            imageBlockWidth={{
              base: computeStylesBasedOnState(showFullGallery, '75px', '25px'),
              sm: computeStylesBasedOnState(showFullGallery, '175px', '45px'),
            }}
            imageBlockHeight={{
              base: computeStylesBasedOnState(showFullGallery, '75px', '25px'),
              sm: computeStylesBasedOnState(showFullGallery, '175px', '45px'),
            }}
          />
        </Flex>

        <Flex
          opacity={computeStylesBasedOnState(showFullGallery, '0', '1')}
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
        opacity={computeStylesBasedOnState(showFullGallery, '1', '0')}
        pos="fixed"
        transition="all 1.5s ease-in-out"
        bottom="0"
        w="full"
        py={{ base: '6px' }}
        bgColor="blackAlpha.400"
        h="40px"
        textAlign="center"
        justify="center"
        align="center"
        onClick={() => setShowFullGallery(false)}
        userSelect="none"
        cursor="pointer"
      >
        <Text color="white" fontSize={{ base: '12px' }}>
          {galleryWarning}
        </Text>
      </Flex>
    </>
  )
}

export default AnniversarySection
