import { Box, BoxProps as BoxPropsType, Skeleton } from '@chakra-ui/react'
import Image, { ImageProps as ImagePropsType } from 'next/image'
import React, { useState } from 'react'

/**
 * @author: Victor Gutierrez
 * @description: Combination of Chakra Box and Next Image (https://nextjs.org/docs/api-reference/next/image)
 * */

const NextImage: React.FC<NextImageProps<ImagePropsType, BoxPropsType>> = ({
  BoxProps,
  ImageProps,
}) => {
  const [loading, setLoading] = useState<boolean>(true)

  function handleLoadEnd() {
    setLoading(false)
  }

  return (
    <Box position="relative" {...BoxProps}>
      {loading && <Skeleton w="full" h="full" borderRadius="xl" />}
      <Image {...ImageProps} layout="fill" onLoadingComplete={handleLoadEnd} />
    </Box>
  )
}

export default NextImage
