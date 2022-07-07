import { Box, Flex, FlexProps as FlexType, LayoutProps, ScaleFade } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'

import { GET_GOOGLE_PHOTOS_ALBUM_PHOTOS } from 'services/queries'
import GoogleImageMosaicBlock from 'components/GoogleImagesGallery/components/GoogleImageMosaicBlock'
import NextImage from 'components/NextImage'
import { useQuery } from 'react-query'

/**
 * @author: Victor Gutierrez
 * @description: Component that displays a Google Photos album as a mosaic of images
 * @property {FlexProps} FlexProps - The flex props to be used for the flex container that holds the photos ~ from ChakraUI
 * @property {string} albumUrl - The URL of the Google Photos album
 * @property {string} queryKey - The query key to be used for React-query caching
 * @property {number} imageBlockWidth - The width of the image block in pixels or Responsive Values from ChakraUI
 * @property {number} imageBlockHeight - The height of the image block in pixels or Responsive Values from ChakraUI
 * */

const GoogleImagesGallery: React.FC<
  GoogleImagesGalleryProps<FlexType, LayoutProps['width'], LayoutProps['height']>
> = ({ FlexProps, queryKey, albumUrl, imageBlockWidth, imageBlockHeight }) => {
  const { data } = useQuery([queryKey, albumUrl], GET_GOOGLE_PHOTOS_ALBUM_PHOTOS, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })
  const imageArray = (data?.data as GooglePhotosImageSet[]) || []

  const [currentImageIndex, setCurrentImageIndex] = useState<undefined | number>(undefined)
  const [showFullImage, setShowFullImage] = useState(false)

  useEffect(() => {
    setShowFullImage(false)
  }, [imageBlockWidth, imageBlockHeight])

  const handlePrev = () => {
    if ((currentImageIndex as number) - 1 >= 0) {
      setCurrentImageIndex((prev) => (prev as number) - 1)
    }
  }

  const handleNext = () => {
    if ((currentImageIndex as number) + 1 < imageArray.length) {
      setCurrentImageIndex((prev) => (prev as number) + 1)
    }
  }

  return (
    <Flex w="full" flexWrap="wrap" overflow="auto" {...FlexProps}>
      {imageArray.map((photo, index) => (
        <Box
          key={photo.uid}
          onClick={() => {
            setShowFullImage(true)
            setCurrentImageIndex(index)
          }}
        >
          <GoogleImageMosaicBlock
            photo={photo}
            imageBlockHeight={imageBlockWidth}
            imageBlockWidth={imageBlockHeight}
          />
        </Box>
      ))}
      {currentImageIndex && showFullImage && (
        <ChevronLeftIcon
          onClick={handlePrev}
          cursor="pointer"
          color="#FF5834"
          zIndex="popover"
          pos="fixed"
          w={{ base: '35px' }}
          h={{ base: '35px' }}
          left={{ base: '5px' }}
          top="calc(50% - 35px)"
        />
      )}
      {currentImageIndex && showFullImage && (
        <NextImage
          ImageProps={{ src: imageArray[currentImageIndex].url, objectFit: 'contain' }}
          BoxProps={{
            w: { base: '100vw' },
            h: { base: '100vh' },
            position: 'fixed',
            bg: 'blackAlpha.600',
            bottom: 0,
            right: 0,
            left: 0,
            top: 0,
            d: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            onClick: () => {
              setShowFullImage(false)
            },
          }}
        />
      )}
      {currentImageIndex && showFullImage && (
        <ChevronRightIcon
          onClick={handleNext}
          cursor="pointer"
          color="#FF5834"
          zIndex="popover"
          pos="fixed"
          w={{ base: '35px' }}
          h={{ base: '35px' }}
          right={{ base: '5px' }}
          top="calc(50% - 35px)"
        />
      )}
    </Flex>
  )
}

export default GoogleImagesGallery
