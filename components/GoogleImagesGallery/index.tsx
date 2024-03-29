import {
  Box,
  Flex,
  FlexProps as FlexType,
  LayoutProps,
  Spinner,
} from '@chakra-ui/react'
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
  GoogleImagesGalleryProps<
    FlexType,
    LayoutProps['width'],
    LayoutProps['height']
  >
> = ({ FlexProps, queryKey, albumUrl, imageBlockWidth, imageBlockHeight }) => {
  const { data } = useQuery(
    [queryKey, albumUrl],
    GET_GOOGLE_PHOTOS_ALBUM_PHOTOS,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  )
  const imageArray = (data?.data as GooglePhotosImageSet[]) || []

  const [currentImageIndex, setCurrentImageIndex] = useState<
    undefined | number
  >(undefined)
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
    <Flex w="full" flexWrap="wrap" {...FlexProps}>
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
      {!isNaN(currentImageIndex as number) && showFullImage && (
        <ChevronLeftIcon
          onClick={handlePrev}
          cursor="pointer"
          color="white"
          zIndex="popover"
          pos="fixed"
          w={{ base: '40px', md: '50px' }}
          h={{ base: '40px', md: '50px' }}
          left={{ base: '5px', md: '20px' }}
          p="2px"
          bg="whiteAlpha.300"
          borderRadius={50}
          top={{ base: 'calc(50% - 40px)', md: 'calc(50% - 50px + 56px)' }}
        />
      )}
      {!isNaN(currentImageIndex as number) && showFullImage && (
        <NextImage
          ImageProps={{
            src: imageArray[currentImageIndex as number].url,
            style: { objectFit: 'contain' },
            alt: imageArray[currentImageIndex as number].url,
          }}
          BoxProps={{
            w: { base: '100%' },
            h: { base: '100%' },
            position: 'fixed',
            bg: 'blackAlpha.700',
            bottom: { base: '0' },
            d: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            onClick: () => {
              setShowFullImage(false)
            },
            __css: {
              '& > span': {
                marginTop: { md: '56px !important' },
              },
            },
            children: <Spinner size="xl" />,
          }}
        />
      )}

      {!isNaN(currentImageIndex as number) && showFullImage && (
        <ChevronRightIcon
          onClick={handleNext}
          cursor="pointer"
          color="white"
          zIndex="popover"
          pos="fixed"
          p="2px"
          bg="whiteAlpha.300"
          borderRadius={50}
          w={{ base: '40px', md: '50px' }}
          h={{ base: '40px', md: '50px' }}
          right={{ base: '5px', md: '20px' }}
          top={{ base: 'calc(50% - 40px)', md: 'calc(50% - 50px + 56px)' }}
        />
      )}
    </Flex>
  )
}

export default GoogleImagesGallery
