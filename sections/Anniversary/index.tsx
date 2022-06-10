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
import React, { useEffect, useRef, useState } from 'react'

import Belgrano from 'assets/images/belgrano.jpg'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Contribua from 'assets/images/contribua-fim-site.png'
import EventPhoto from 'assets/images/inscricoes-festa.png'
import { GET_EXTERNAL_EVENT_BY_SLUG } from 'services/queries'
import MarkerImg from 'assets/images/marker.png'
import NotFound from 'pages/404'
import SubscriptionForm from 'sections/Anniversary/components/SubscriptionForm'
import YouTube from 'react-youtube'
import dynamic from 'next/dynamic'
import { useIntersectionRevealer } from 'react-intersection-revealer'
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
  const { data, refetch } = useQuery([`event-${eventSlug}`, eventSlug], GET_EXTERNAL_EVENT_BY_SLUG)
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
      document.getElementById('scroll')?.scrollIntoView({ behavior: 'smooth', block: 'end' })

      clearTimeout(t)
    }, 350)

    const t2 = setTimeout(() => {
      document.getElementById('scrolltop')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setFakeLoading(false)

      clearTimeout(t2)
    }, 2000)

    const t3 = setInterval(() => {
      /* @ts-ignore */
      const marker = document.querySelector('div.leaflet-pane.leaflet-marker-pane > img')

      if (marker) {
        /* @ts-ignore */
        marker.src = MarkerImg.src
        /* @ts-ignore */
        if (marker.src == MarkerImg.src) {
          clearInterval(t3)
        } else {
          clearInterval(t3)
        }
      }
    }, 1000)
  }, [])

  if (!data) {
    refetch()

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
            document.getElementById('scroll')?.scrollIntoView({ behavior: 'smooth', block: 'end' })
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
        >
          <Box
            alignSelf="center"
            h={{ base: '450px', sm: '450px' }}
            w={{
              base: dimensions?.contentBox.width || '100vw',
            }}
            maxWidth="1200px"
            borderRadius="xl"
            css={{
              '.leaflet-tile': {
                filter: 'hue-rotate(180deg) invert(100%)',
              },
            }}
          >
            {!fakeLoading ? (
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
            ) : (
              <Skeleton w="100%" h="100%" />
            )}
          </Box>
        </Flex>
        <Flex
          justifyContent="center"
          alignContent="center"
          flexDir={{ base: 'column' }}
          textAlign="center"
          mt={{ base: '50px' }}
          color="#FF5835"
          ref={form}
        >
          <SubscriptionForm id={id as string} />
        </Flex>
        <Image
          scrollSnapAlign="center"
          w={{
            base: '80%',
          }}
          maxW="1200px"
          fallback={<Skeleton w={{ base: '100%', md: '80%', '2lg': '50%' }} />}
          src={Contribua.src}
          id="scroll"
        />
      </Flex>
    </Flex>
  )
}

export default AnniversarySection
