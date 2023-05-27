import { Heading, useBreakpointValue, useToast } from '@chakra-ui/react'
import GoogleImagesGallery from 'components/GoogleImagesGallery'
import Interactions from 'components/Interactions'
import PageWithHeadingImage from 'components/PageWithHeadingImage'
import { useUser } from 'context/UserContext'
import { useRouter } from 'next/router'
import NotFound from 'pages/404'
import { useMutation, useQuery } from 'react-query'
import { LIKE_GALLERY } from 'services/mutations'
import { GET_GALLERY_BY_ID } from 'services/queries'

const GallerySection = () => {
  const { query } = useRouter()
  const { id: galleryId } = query
  const { userData } = useUser()
  const imageSize = useBreakpointValue({ base: 65, md: 32 })
  const toast = useToast()

  const { data, isError, refetch } = useQuery(
    [`galleries-${galleryId}`, galleryId],
    GET_GALLERY_BY_ID,
  )

  const { mutateAsync: likeGallery } = useMutation(LIKE_GALLERY)

  if (isError) {
    return <NotFound />
  }

  if (data) {
    const { id, title, googlePhotosAlbumUrl, coverImage, GalleryLikes, GalleryViews } =
      data?.data

    const likes = GalleryLikes?.length || 0
    const views = GalleryViews?.length || 0

    const userLiked =
      Boolean(
        GalleryLikes.find((interaction) => interaction?.User.name === userData?.name),
      ) || false

    const handleLike = async () => {
      if (userData) {
        await likeGallery(id)
        await refetch()

        toast({
          description: userLiked
            ? 'Você descurtiu esta galeria'
            : 'Você curtiu esta galeria',
        })
      } else {
        toast({
          description: 'Você precisa estar logado para curtir esta galeria',
        })
      }
    }
    return (
      <>
        <PageWithHeadingImage
          pageTitle={`Gênesis Church - Galeria | ${title}`}
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
        </PageWithHeadingImage>

        <GoogleImagesGallery
          albumUrl={googlePhotosAlbumUrl}
          queryKey={`galleries-${galleryId}`}
          key={id}
          FlexProps={{
            flexWrap: 'wrap',
            w: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          imageBlockWidth={imageSize}
          imageBlockHeight={imageSize}
        />
      </>
    )
  }
}

export default GallerySection
