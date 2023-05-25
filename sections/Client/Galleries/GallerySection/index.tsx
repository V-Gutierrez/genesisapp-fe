import { Heading, useBreakpointValue, useToast } from "@chakra-ui/react"
import GoogleImagesGallery from "components/GoogleImagesGallery"
import Interactions from "components/Interactions"
import PageWithHeadingImage from "components/PageWithHeadingImage"
import { useUser } from "context/UserContext"
import { useRouter } from "next/router"
import NotFound from "pages/404"
import { useMutation, useQuery } from "react-query"
import { LIKE_GALLERY } from "services/mutations"
import { GET_GALLERY_BY_ID } from "services/queries"

const GallerySection = () => {
  const { query } = useRouter()
  const { userData } = useUser()
  const { id: galleryId } = query
  const imageSize = useBreakpointValue({ base: 40, md: 32 })

  const { data, refetch, isLoading, isError } = useQuery(
    [`galleries-${galleryId}`, galleryId],
    GET_GALLERY_BY_ID,
  )
  const toast = useToast()
  const { mutateAsync: likeNews } = useMutation(LIKE_GALLERY)



  if (isError) {
    return <NotFound />
  }

  if (data) {
    const { id, title, googlePhotosAlbumUrl, coverImage } =
      data?.data


    return (
      <>
        <PageWithHeadingImage
          pageTitle={`Gênesis Church - Galeria | ${title}`}
          headingImage={coverImage}
        >
          <Heading textAlign={'center'}>{title}</Heading>
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