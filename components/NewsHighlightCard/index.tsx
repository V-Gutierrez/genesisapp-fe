import { Box, Link, Text, Heading, Flex } from '@chakra-ui/react'
import NextImage from 'components/NextImage'
import { useRouter } from 'next/router'
import React from 'react'

const NewsHighlightCard: React.FC<News> = ({ coverImage, title, highlightText, slug }) => {
  const { push } = useRouter()

  const handleSeeNews = () => {
    push(`/noticias/${slug}`)
  }

  return (
    <Box
      display="flex"
      flex="1"
      justifyContent="center"
      flexDir={{ base: 'column' }}
      alignItems="center"
      position="relative"
      w={{ base: 'full' }}
      h={{ base: '250px', sm: '300px', md: '350px' }}
      onClick={handleSeeNews}
      cursor="pointer"
    >
      <NextImage
        ImageProps={{
          src: coverImage,
          objectFit: 'cover',
        }}
        BoxProps={{
          width: { base: 'full' },
          height: { base: '250px', sm: '300px', md: '350px' },
          marginRight: { base: 0 },
          borderRadius: 'lg',
          overflow: 'hidden',
          position: { base: 'absolute' },
        }}
      />
      <Flex
        flexDir="column"
        w={{ base: 'full' }}
        h={{ base: 'full' }}
        justifyContent="center"
        align="center"
        textAlign={{ base: 'center' }}
        zIndex="overlay"
        bg={{ base: 'blackAlpha.500' }}
        color={{ base: 'white' }}
      >
        <Heading marginTop="1" fontSize={{ base: '18px' }} m={{ base: 2 }}>
          <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
            {title}
          </Link>
        </Heading>
        <Text as="p" fontSize="l" color={{ base: 'white' }} p={{ base: 2 }}>
          {highlightText}
        </Text>
      </Flex>
    </Box>
  )
}

export default NewsHighlightCard
