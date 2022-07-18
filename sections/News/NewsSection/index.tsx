import { Box, Heading, Text, useToast } from '@chakra-ui/react'
import { useMutation, useQuery } from 'react-query'

import { GET_DEVOTIONAL_BY_SLUG, GET_NEWS_BY_SLUG } from 'services/queries'
import Interactions from 'components/Interactions'
import { LIKE_DEVOTIONAL } from 'services/mutations'
import NotFound from 'pages/404'
import PageWithHeadingImage from 'components/PageWithHeadingImage'
import { formatToTimezone } from 'helpers/time'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'context/UserContext'

export default function NewsSection() {
  const { query } = useRouter()
  const { userData } = useUser()
  const { slug: newsSlug } = query
  const { data, refetch, isLoading, isError } = useQuery(
    [`news-${newsSlug}`, newsSlug],
    GET_NEWS_BY_SLUG,
  )

  if (isError) {
    return <NotFound />
  }

  if (isLoading || !data) {
    return null
  }

  if (data) {
    const { title, body, scheduledTo, coverImage } = data?.data

    const formatedScheduledDate = useMemo(
      () => formatToTimezone(scheduledTo, "' Em' dd 'de' MMMM 'de' yyyy 'às' HH:mm"),
      [scheduledTo],
    )

    return (
      <PageWithHeadingImage
        pageTitle={`Gênesis Church - Devocionais | ${title}`}
        headingImage={coverImage}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight="100%"
          textAlign="center"
        >
          {title}
        </Heading>
        <Box dangerouslySetInnerHTML={{ __html: body }} maxW="100%" />

        <Text fontFamily="Caveat" fontSize="lg">
          {formatedScheduledDate}
        </Text>
      </PageWithHeadingImage>
    )
  }
}
