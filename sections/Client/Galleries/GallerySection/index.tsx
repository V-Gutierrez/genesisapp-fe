import { Heading, useBreakpointValue } from '@chakra-ui/react'
import GoogleImagesGallery from 'components/GoogleImagesGallery'
import PageWithHeadingImage from 'components/PageWithHeadingImage'
import { useRouter } from 'next/router'
import NotFound from 'pages/404'
import { useQuery } from 'react-query'
import { GET_GALLERY_BY_ID } from 'services/queries'

const GallerySection = () => {
  const { query } = useRouter()
  const { id: galleryId } = query
  const imageSize = useBreakpointValue({ base: 65, md: 32 })

  const { data, isError } = useQuery(
    [`galleries-${galleryId}`, galleryId],
    GET_GALLERY_BY_ID,
  )
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
          <Heading textAlign="center">{title}</Heading>
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
