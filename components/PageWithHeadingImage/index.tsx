import { Box, Container, Flex, Stack } from '@chakra-ui/react'

import Head from 'next/head'
import NextImage from 'components/NextImage'
import React from 'react'

const PageWithHeadingImage: React.FC<PageWithHeadingImageProps> = ({
  pageTitle,
  headingImage,
  children,
}) => (
  <>
    <Head>
      <title>{pageTitle}</title>
    </Head>
    <Flex flexDir="column" w="100%" overflow="clip" align="center">
      <NextImage
        ImageProps={{
          src: headingImage,
          priority: true,
          objectFit: 'cover',
        }}
        BoxProps={{
          w: '100%',
          h: { base: '200px', md: '300px' },
          borderRadius: 'xl',
          overflow: 'hidden',
        }}
      />
      <Container maxW="3xl">
        <Stack as={Box} spacing={{ base: 8, md: 14 }} py={{ base: 5, md: 10 }}>
          {children}
        </Stack>
      </Container>
    </Flex>
  </>
)

export default PageWithHeadingImage
