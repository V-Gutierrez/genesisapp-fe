import {
  Box,
  Flex,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'

import AnniversaryNewsMobile from 'assets/images/inscricoes-festa-mobile.png'
import Background from 'assets/images/WaveLine.svg'
import Belgrano from 'assets/images/belgrano.jpg'
import { GET_EXTERNAL_EVENT_BY_SLUG } from 'services/queries'
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

  const sizes = useBreakpointValue({
    base: { h: '250px', w: '300px' },
    sm: { h: '250px', w: '460px' },
    md: { h: '350px', w: '660px' },
    lg: { h: '450px', w: '700px' },
  })

  useEffect(() => {
    document.body.style.background = `url(${Background.src})`
  }, [data])

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
      w="100%"
      align="center"
      flexDir="column"
      bgSize="cover"
      bgPos="center"
      scrollSnapType="y mandatory"
      bgImage={Background.src}
    >
      <Flex w="full" align="center" flexDir="column" px={2} borderRadius="xl">
        <Image
          scrollSnapAlign="center"
          w={{
            base: '300px',
            sm: '460px',
            md: '660px',
            lg: '700px',
          }}
          fallback={<Skeleton w={{ base: '100%', md: '80%', '2lg': '50%' }} />}
          mt={{ base: 6 }}
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
          mb={{ base: 4 }}
          justifyContent="center"
          alignContent="center"
          flexDir={{ base: 'column' }}
          w={{
            base: '300px',
            sm: '460px',
            md: '660px',
            lg: '700px',
          }}
        >
          <Box
            h={{ base: '300px', sm: '450px' }}
            w={{
              base: '300px',
              sm: '460px',
              md: '660px',
              lg: '700px',
            }}
          >
            <MapContainer
              /* @ts-ignore */
              center={[-34.56701381127262, -58.44956295063482]}
              zoomAnimation
              zoom={15}
              fadeAnimation
              scrollWheelZoom
            >
              <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" />
              <Marker position={[-34.56701381127262, -58.44956295063482]} data-tip="userTip">
                <Popup>
                  <Image
                    src={Belgrano.src}
                    w={{
                      base: '100%',
                      sm: '460px',
                      md: '660px',
                      lg: '700px',
                    }}
                  />
                  <Text>Auditório Belgrano</Text>
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
        >
          <Heading>Inscreva-se!</Heading>
          <Text fontStyle="italic">Auditório Belgrano, 19h, 13/06/2022</Text>
          <SubscriptionForm id={id as string} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AnniversarySection
