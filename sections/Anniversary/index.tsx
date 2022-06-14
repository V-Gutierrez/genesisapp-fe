import {
  Box,
  Flex,
  Image,
  Skeleton,
  Text,
  useBreakpointValue,
  useDimensions,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

import Belgrano from 'assets/images/belgrano.jpg'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Contribua from 'assets/images/contribua-fim-site.png'
import EventPhoto from 'assets/images/inscricoes-festa.png'
import Head from 'next/head'
import MarkerImg from 'assets/images/marker.png'
import SubscriptionForm from 'sections/Anniversary/components/SubscriptionForm'
import YouTube from 'react-youtube'
import dynamic from 'next/dynamic'
import { useIntersectionRevealer } from 'react-intersection-revealer'
import { useRouter } from 'next/router'

export const MapContainer = dynamic(
  async () => {
    const { MapContainer } = await import('react-leaflet')
    return MapContainer
  },
  { ssr: false },
)
export const TileLayer = dynamic(
  async () => {
    const { TileLayer } = await import('react-leaflet')
    return TileLayer
  },
  { ssr: false },
)
export const Marker = dynamic(
  async () => {
    const { Marker } = await import('react-leaflet')
    return Marker
  },
  { ssr: false },
)
export const Popup = dynamic(
  async () => {
    const { Popup } = await import('react-leaflet')
    return Popup
  },
  { ssr: false },
)

const AnniversarySection: React.FC = () => {
  const imageArt = useRef(null)
  const elementRef = useRef(null)
  const form = useRef(null)
  const dimensions = useDimensions(elementRef, true) || {
    contentBox: { width: '300px', height: 0 },
  }

  const { inView } = useIntersectionRevealer(form)
  const [fakeLoading, setFakeLoading] = useState(true)
  const [showArrow, setShowArrow] = useState(true)

  const sizes = useBreakpointValue({
    base: { h: '300px', w: dimensions?.contentBox.width },
    sm: { h: '450px', w: dimensions?.contentBox.width },
    md: { h: '550px', w: dimensions?.contentBox.width },
    lg: {
      h: '650px',
      w: dimensions
        ? dimensions?.contentBox?.width! > 1200
          ? '1200px'
          : dimensions?.contentBox.width
        : '300px',
    },
  })

  useEffect(() => {
    setShowArrow(!inView)
  }, [inView])

  useEffect(() => {
    const t = setTimeout(() => {
      document.getElementById('scroll')?.scrollIntoView({ behavior: 'smooth', block: 'end' });
(document.body as any).style = 'overflow-x: hidden'
      clearTimeout(t)
    }, 350)
  }, [])

  const opts = {
    height: sizes?.h,
    width: sizes?.w,
    playerVars: {
      autoplay: 1,
    },
  }

  return (
    <>
      <Head>
        <title>Gênesis Church - Aniversário 13 anos</title>
      </Head>
      <Flex
        minH="99vh"
        w="100vw"
        align="center"
        justify="center"
        flexDir="column"
        bgSize="cover"
        bgPos="center"
        scrollSnapType="y mandatory"
        bg="black"
        ref={elementRef}
      >
        {showArrow && (
          <Flex
            w="45px"
            h="45px"
            borderRadius="xl"
            position="fixed"
            bottom={2}
            right={2}
            align="center"
            justify="center"
            bg="#FF5835"
            zIndex="popover"
            _active={{
              background: 'black',
              color: 'white',
            }}
            cursor="pointer"
            onClick={() => {
              document
                .getElementById('scroll')
                ?.scrollIntoView({ behavior: 'smooth', block: 'end' })
            }}
          >
            <ChevronDownIcon h="30px" w="30px" />
          </Flex>
        )}
        <Flex w="full" align="center" justify="flex-start" flexDir="column">
          <Image
            scrollSnapAlign="center"
            w={{
              base: '100%',
            }}
            id="scrolltop"
            maxW="1200px"
            fallback={<Skeleton w={{ base: '100%', md: '80%', '2lg': '50%' }} />}
            src={EventPhoto.src}
            ref={imageArt}
          />
          <Box my={5} scrollSnapAlign="center">
            <YouTube
              videoId="hEZ0GlBlTWw"
              opts={{
                ...opts,
              }}
            />
          </Box>
          <Flex
            justifyContent="center"
            alignContent="center"
            flexDir={{ base: 'column' }}
            w={{
              base: '100%',
            }}
            maxWidth="1200px"
          />
          <Flex
            justifyContent="center"
            alignContent="center"
            flexDir={{ base: 'column' }}
            textAlign="center"
            mt={{ base: '50px' }}
            color="#FF5835"
            ref={form}
            id="scroll"
          >
            <SubscriptionForm id="id" />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default AnniversarySection
