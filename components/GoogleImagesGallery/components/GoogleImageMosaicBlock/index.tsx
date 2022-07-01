import { LayoutProps } from '@chakra-ui/react'
import NextImage from 'components/NextImage'
import React from 'react'

const GoogleImageMosaicBlock: React.FC<
  GoogleImageMosaicBlockProps<LayoutProps['width'], LayoutProps['height']>
> = ({ photo, imageBlockWidth, imageBlockHeight }) => (
  <NextImage
    ImageProps={{ objectFit: 'cover', src: photo.thumbnail }}
    BoxProps={{
      width: imageBlockWidth,
      height: imageBlockHeight,
      margin: { base: '.15px' },
      transition: 'all 1.5s ease-in-out',
      borderRadius: 'lg',
      id: photo.uid,
    }}
  />
)

export default GoogleImageMosaicBlock
