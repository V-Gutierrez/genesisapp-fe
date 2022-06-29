import { Box, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'

import NextImage from 'components/NextImage'

const ImageCard: React.FC<ImageCardProps> = ({ photo }) => {
  const [imageToggle, setImageToggle] = useState<boolean | null>(false)

  const imageSrc = imageToggle ? photo.highQuality : photo.thumbnail

  const handleClick = () => {
    setImageToggle(!imageToggle)
  }

  return (
    <Box
      background="blackAlpha.600"
      pos={imageToggle ? 'fixed' : 'relative'}
      top={0}
      bottom={0}
      left={0}
      right={0}
      d="flex"
      alignItems="center"
      justifyContent="space-evenly"
      zIndex={imageToggle ? 'popover' : '0'}
      onClick={handleClick}
    >
      {imageToggle && <Spinner color="white" size="xl" />}
      <NextImage
        key={photo.uid}
        ImageProps={{ objectFit: 'cover', src: imageSrc }}
        BoxProps={{
          width: imageToggle ? photo.width * 0.2 : '150px',
          height: imageToggle ? photo.height * 0.2 : '150px',
          margin: '.5px',
          transition: 'all 1.5s ease-in-out',
          borderRadius: 'lg',
          onClick: handleClick,
          id: photo.uid,
          position: imageToggle ? 'absolute' : 'relative',
          zIndex: imageToggle ? '2' : '0',
        }}
      />
    </Box>
  )
}

export default ImageCard
