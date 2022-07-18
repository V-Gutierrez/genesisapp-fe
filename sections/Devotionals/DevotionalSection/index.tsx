import { Box, Heading, Text, useToast } from '@chakra-ui/react'
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
  const { data, isLoading, isError, refetch } = useQuery(
    [`devotional-${devotionalSlug}`, devotionalSlug],
    GET_DEVOTIONAL_BY_SLUG,
  )

  const { mutateAsync: likeDevotional } = useMutation(LIKE_DEVOTIONAL)

  if (isError) {
    return <NotFound />
  }

  if (isLoading || !data) {
    return null
  }

  if (data) {
    const toast = useToast()
    const { title, body, author, scheduledTo, coverImage, DevotionalViews, id, DevotionalLikes } =
      data?.data

    const likes = DevotionalLikes?.length || 0
    const views = DevotionalViews?.length || 0
    const userLiked =
      Boolean(DevotionalLikes.find((interaction) => interaction?.userId === userData?.id)) || false

    const handleLike = async () => {
      if (userData) {
        await likeDevotional(id)
        await refetch()
        toast({
          description: userLiked ? 'Você descurtiu este devocional' : 'Você curtiu este devocional',
        })
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
        />
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight="100%"
        >
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
}
