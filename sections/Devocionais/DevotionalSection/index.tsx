import { Box, Heading, Text, toast, useToast } from '@chakra-ui/react'
import { useMutation, useQuery } from 'react-query'

import { GET_DEVOTIONAL_BY_SLUG } from 'services/queries'
import Interactions from 'components/Interactions'
import { LIKE_DEVOTIONAL } from 'services/mutations'
import NotFound from 'pages/404'
import PageWithHeadingImage from 'components/PageWithHeadingImage'
import { formatToTimezone } from 'helpers/time'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'context/UserContext'

export default function DevotionalSection() {
  const { query } = useRouter()
  const { userData } = useUser()
  const { slug: devotionalSlug } = query
  const { data, refetch } = useQuery(
    [`devotional-${devotionalSlug}`, devotionalSlug],
    GET_DEVOTIONAL_BY_SLUG,
  )
  const { mutateAsync: likeDevotional } = useMutation(LIKE_DEVOTIONAL)
  const toast = useToast()

  if (!data) {
    return <NotFound />
  }

  const { title, body, author, scheduledTo, coverImage, views, likes, id, userLiked } = data.data

  const handleLike = async () => {
    if (userData) {
      await likeDevotional(id)
      await refetch()
    } else {
      toast({ description: 'Você precisa estar logado para curtir este devotional' })
    }
  }

  const formatedScheduledDate = useMemo(
    () => formatToTimezone(scheduledTo, "' Em' dd 'de' MMMM 'de' yyyy 'às' HH:mm"),
    [scheduledTo],
  )

  return (
    <PageWithHeadingImage
      pageTitle={`Gênesis Church - Devocionais | ${title} de ${author}`}
      headingImage={coverImage}
    >
      <Interactions
        views={views}
        likes={likes}
        liked={userLiked}
        onLikeInteraction={handleLike}
        onDislikeInteraction={handleLike}
        likeMessage="Você curtiu este devocional"
      />
      <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight="100%">
        {title}
      </Heading>
      <Box dangerouslySetInnerHTML={{ __html: body }} maxW="100%" />

      <Text fontFamily="Caveat" fontSize="lg">
        {formatedScheduledDate} por
        {` ${author}`}
      </Text>
    </PageWithHeadingImage>
  )
}
