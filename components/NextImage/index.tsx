import { Box, BoxProps as BoxPropsType } from '@chakra-ui/react';
import Image, { ImageProps as ImagePropsType } from 'next/image'

import React from 'react';

/**
* @author: Victor Gutierrez
* @description: Combination of Chakra Box and Next Image (https://nextjs.org/docs/api-reference/next/image)
* */

const NextImage: React.FC<NextImageProps<ImagePropsType, BoxPropsType>> = ({ BoxProps, ImageProps }) => (
    <Box
      position="relative"
      {...BoxProps}
    >
      <Image
        {...ImageProps}
        layout="fill"
      />
    </Box>
  )

export default NextImage;
