import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'

import Link from 'next/link'

export default function CTA({ title, subtitle, buttonText, buttonHref }: CTAProps) {
  return (
    <Container w="100%" h="80vh">
      <Stack
        as={Box}
        textAlign="center"
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
        display="flex"
        justifyContent="center"
        h="80vh"
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight="110%"
        >
          <Text as="span" color="black.400">
            {title}
          </Text>
        </Heading>
        <Text color="gray.500">{subtitle}</Text>
        <Stack direction="column" spacing={3} align="center" alignSelf="center" position="relative">
          <Link href={buttonHref} legacyBehavior>
            <Button
              bg="black"
              rounded="full"
              px={6}
              color="white"
              _hover={{
                bg: 'black.200',
              }}
            >
              {buttonText}
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
