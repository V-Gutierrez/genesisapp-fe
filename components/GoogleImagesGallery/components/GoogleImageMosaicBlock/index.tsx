import { LayoutProps } from '@chakra-ui/react'
import NextImage from 'components/NextImage'
import React from 'react'

const GoogleImageMosaicBlock: React.FC<
  GoogleImageMosaicBlockProps<LayoutProps['width'], LayoutProps['height']>
> = ({ photo, imageBlockWidth, imageBlockHeight }) => (
  <NextImage
    ImageProps={{ objectFit: 'cover', src: photo.thumbnail, alt: photo.url }}
    BoxProps={{
      width: imageBlockWidth,
      height: imageBlockHeight,
      transition: 'all 1.5s ease-in-out',
      borderRadius: 'lg',
      id: photo.uid,
      cursor: 'pointer',
      _hover: {
        opacity: 0.5,
      },
    }}
    customLoadingTimeout={20000}
  />
)

export default GoogleImageMosaicBlock
