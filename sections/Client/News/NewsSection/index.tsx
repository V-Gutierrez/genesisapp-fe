import { Box, Heading, Text, useToast } from '@chakra-ui/react'
import { useMutation, useQuery } from 'react-query'
import 'react-quill/dist/quill.snow.css'

import { GET_NEWS_BY_SLUG } from 'services/queries'
import Interactions from 'components/Interactions'
import NotFound from 'pages/404'
import PageWithHeadingImage from 'components/PageWithHeadingImage'
import { formatToTimezone } from 'helpers/time'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'context/UserContext'
import { LIKE_NEWS } from 'services/mutations'

export default function NewsSection() {
  const { query } = useRouter()
  const { userData } = useUser()
  const { slug: newsSlug } = query
  const { data, refetch, isLoading, isError } = useQuery(
    [`news-${newsSlug}`, newsSlug],
    GET_NEWS_BY_SLUG,
  )
  const toast = useToast()

  const { mutateAsync: likeNews } = useMutation(LIKE_NEWS)

  if (isError) {
    return <NotFound />
  }

  if (isLoading || !data) {
    return null
  }

  if (data) {
    const { id, title, body, scheduledTo, coverImage, NewsLikes, NewsViews } = data?.data

    const likes = NewsLikes?.length || 0
    const views = NewsViews?.length || 0
    const userLiked =
      Boolean(NewsLikes.find((interaction) => interaction?.userId === userData?.id)) || false

    const formatedScheduledDate = useMemo(
      () => formatToTimezone(scheduledTo, "' Em' dd 'de' MMMM 'de' yyyy 'às' HH:mm"),
      [scheduledTo],
    )

    const handleLike = async () => {
      if (userData) {
        await likeNews(id)
        await refetch()
        toast({
          description: userLiked ? 'Você descurtiu esta notícia' : 'Você curtiu esta notícia',
        })
      } else {
        toast({ description: 'Você precisa estar logado para curtir esta notícia' })
      }
    }

    return (
      <PageWithHeadingImage
        pageTitle={`Gênesis Church - Notícia | ${title}`}
        headingImage={coverImage}
      >
        <Interactions
          likes={likes}
          views={views}
          liked={userLiked}
          onLikeInteraction={handleLike}
          onDislikeInteraction={handleLike}
        />
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
