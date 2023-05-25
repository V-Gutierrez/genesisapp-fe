import { Box, Text } from '@chakra-ui/react'
import NextImage from 'components/NextImage'
import { useRouter } from 'next/router'

const GalleryCard: React.FC<Gallery> = (gallery) => {
  const { push } = useRouter()

  const handleSeeGallery = (id: string) => {
    push(`/galerias/${id}`)
  }

  return (
    <Box
      w={{ base: '100%' }}
      h={{ base: '200px' }}
      d="flex"
      justifyContent="center"
      alignItems="center"
      pos="relative"
      cursor="pointer"
      mb={2}
      onClick={() => handleSeeGallery(gallery.id)}
    >
      <NextImage
        ImageProps={
          {
            src: gallery.coverThumbnail,
            alt: gallery.title,
            style: { objectFit: 'cover' },
          }
        }
        BoxProps={{
          w: '100%',
          h: '100%',
          pos: 'absolute',
          zIndex: 1,
        }}
      />
      <Box
        bg="blackAlpha.600"
        w="100%"
        h="100%"
        d="flex"
        justifyContent="center"
        alignItems="center"
        zIndex={2}
      >
        <Text
          color="white"
          fontWeight="bold"
          fontSize="lg"
        >
          {gallery.title}
        </Text>
      </Box>
    </Box>
  )
}

export default GalleryCard
