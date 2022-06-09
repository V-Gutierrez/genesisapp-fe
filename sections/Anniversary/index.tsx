import {
  Box,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
  useBreakpointValue,
  useDimensions,
} from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'

import Belgrano from 'assets/images/belgrano.jpg'
import { GET_EXTERNAL_EVENT_BY_SLUG } from 'services/queries'
import MarkerImg from 'assets/images/marker.png'
import NotFound from 'pages/404'
import SubscriptionForm from 'sections/Anniversary/components/SubscriptionForm'
import YouTube from 'react-youtube'
import dynamic from 'next/dynamic'
import { useQuery } from 'react-query'
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
  const { query } = useRouter()
  const { slug: eventSlug } = query
  const { data } = useQuery([`event-${eventSlug}`, eventSlug], GET_EXTERNAL_EVENT_BY_SLUG)
  const imageArt = useRef(null)
  const elementRef = useRef(null)
  const dimensions = useDimensions(elementRef, true) || {
    contentBox: { width: '300px', height: 0 },
  }

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
    const t = setTimeout(() => {
      document.getElementById('scroll')?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      /* @ts-ignore */
      document.querySelector('div.leaflet-pane.leaflet-marker-pane > img').src = MarkerImg.src
      clearTimeout(t)
    }, 350)

    const t2 = setTimeout(() => {
      document.getElementById('scrolltop')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      clearTimeout(t2)
    }, 1850)
  }, [])

  if (!data) {
    return <NotFound />
  }

  const { coverImage, id } = data?.data ?? {}

  const opts = {
    height: sizes?.h,
    width: sizes?.w,
    playerVars: {
      autoplay: 1,
    },
  }

  return (
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
      <Flex w="full" align="center" justify="flex-start" flexDir="column">
        <Image
          scrollSnapAlign="center"
          w={{
            base: '100vw',
          }}
          id="scrolltop"
          maxW="1200px"
          fallback={<Skeleton w={{ base: '100%', md: '80%', '2lg': '50%' }} />}
          src={coverImage}
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
            base: dimensions?.contentBox.width,
          }}
        >
          <Box
            h={{ base: '450px', sm: '450px' }}
            w={{
              base: dimensions?.contentBox.width || '100vw',
            }}
            borderRadius="xl"
            css={{
              '.leaflet-tile': {
                filter: 'hue-rotate(180deg) invert(100%)',
              },
            }}
          >
            <MapContainer
              /* @ts-ignore */
              center={[-34.56701381127262, -58.44956295063482]}
              zoomAnimation
              zoom={15}
              fadeAnimation
            >
              <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" />
              <Marker position={[-34.56701381127262, -58.44956295063482]} data-tip="userTip">
                <Popup
                  /* @ts-ignore */
                  className="customPopup"
                >
                  <Image src={Belgrano.src} />
                  <Text>Auditório Belgrano </Text>
                  <Text> Virrey Loreto 2348, C1426 CABA</Text>
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Flex>
        <Flex
          justifyContent="center"
          alignContent="center"
          flexDir={{ base: 'column' }}
          textAlign="center"
          mt={{ base: '50px' }}
          color="#FF5835"
          id="scroll"
        >
          <SubscriptionForm id={id as string} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AnniversarySection
