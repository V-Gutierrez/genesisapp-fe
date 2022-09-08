import { Box, Heading } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import 'react-quill/dist/quill.snow.css'

import { GET_EVENTS_BY_ID } from 'services/queries'
import Interactions from 'components/Interactions'
import NotFound from 'pages/404'
import PageWithHeadingImage from 'components/PageWithHeadingImage'
import { useRouter } from 'next/router'
import { SubscriptionForm } from './components/SubscriptionForm'

export default function EventSection() {
  const { query } = useRouter()
  const { id: eventId } = query
  const { data, refetch, isLoading, isError } = useQuery(
    [`events-${eventId}`, eventId],
    GET_EVENTS_BY_ID,
  )

  if (isError) {
    return <NotFound />
  }

  if (isLoading || !data) {
    return null
  }

  if (data) {
    const { title, description, coverImage } = data?.data

    return (
      <PageWithHeadingImage
        pageTitle={`Gênesis Church - Inscrição | ${title}`}
        headingImage={coverImage}
      >
        <Interactions
          likes={0}
          views={0}
          liked={false}
          onLikeInteraction={() => null}
          onDislikeInteraction={() => null}
          showOnlyShare
        />
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight="100%"
          textAlign="center"
        >
          {title}
        </Heading>
        <Box dangerouslySetInnerHTML={{ __html: description }} maxW="100%" />
        <SubscriptionForm {...data?.data} eventId={eventId as string} refetch={refetch} />
      </PageWithHeadingImage>
    )
  }
}
