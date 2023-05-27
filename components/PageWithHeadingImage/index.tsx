import { Box, Container, Flex, Stack } from '@chakra-ui/react'

import Head from 'next/head'
import NextImage from 'components/NextImage'
import React from 'react'

/**
 * This is a TypeScript React functional component that renders a page with a heading image, a page
 * title, and children components.
 * @param  - - `pageTitle`: a string representing the title of the page
 * @param  - - `headingImage`: a string the desired image source
 * @param  - - `children`: Wrapped components
 */
const PageWithHeadingImage: React.FC<PageWithHeadingImageProps> = ({
  pageTitle,
  headingImage,
  children,
}) => (
  <>
    <Head>
      <title>{pageTitle}</title>
    </Head>
    <Flex flexDir="column" w="100%" overflow="hidden" align="center">
      <NextImage
        ImageProps={{
          src: headingImage,
          priority: true,
          style: { objectFit: 'cover' },
          alt: pageTitle,
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
