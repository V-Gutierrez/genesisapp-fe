import { Flex, FlexProps as FlexType, LayoutProps } from '@chakra-ui/react'

import { GET_GOOGLE_PHOTOS_ALBUM_PHOTOS } from 'services/queries'
import GoogleImageMosaicBlock from 'components/GoogleImagesGallery/components/GoogleImageMosaicBlock'
import React from 'react'
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
  return (
    <Flex w="full" flexWrap="wrap" overflow="auto" {...FlexProps}>
      {data?.data.map((photo) => (
        <GoogleImageMosaicBlock
          key={photo.uid}
          photo={photo}
          imageBlockHeight={imageBlockWidth}
          imageBlockWidth={imageBlockHeight}
        />
      ))}
    </Flex>
  )
}

export default GoogleImagesGallery
