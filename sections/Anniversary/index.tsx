import {
 Box, Flex, Image, Skeleton, useBreakpointValue,
} from '@chakra-ui/react'
import React, { useRef } from 'react'

import AnniversaryNewsMobile from 'assets/images/inscricoes-festa-mobile.png'
import Background from 'assets/images/WaveLine.svg'
import { GET_EXTERNAL_EVENT_BY_SLUG } from 'services/queries'
import NotFound from 'pages/404'
import SubscriptionForm from 'sections/Anniversary/components/SubscriptionForm'
import YouTube from 'react-youtube'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

const AnniversarySection: React.FC = () => {
  const { query } = useRouter()
  const { slug: eventSlug } = query
  const { data } = useQuery([`event-${eventSlug}`, eventSlug], GET_EXTERNAL_EVENT_BY_SLUG)
  const imageArt = useRef(null)

  const sizes = useBreakpointValue({
    base: { h: '150px', w: '280px' },
    sm: { h: '250px', w: '460px' },
    md: { h: '350px', w: '660px' },
    lg: { h: '450px', w: '700px' },
  })

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
      <Image
        scrollSnapAlign="center"
        w={{ base: '100%', md: '80%', lg: '50%' }}
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
            width: (imageArt?.current as any)?.clientWidth! || sizes?.w,
            height: (imageArt?.current as any)?.clientHeight! || sizes?.h,
          }}
        />
      </Box>
      <SubscriptionForm id={id as string} />
    </Flex>
  )
}

export default AnniversarySection
