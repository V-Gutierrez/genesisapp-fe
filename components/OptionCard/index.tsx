import {
 Center, Flex, Heading, Icon, useColorModeValue,
} from '@chakra-ui/react';

import Link from 'next/link';

export default function OptionCard({ icon, title, goTo }: OptionCard) {
  return (
    <Center cursor="pointer" scrollSnapAlign="center">
      <Link href={goTo}>
        <Flex
          w={{ base: '100%' }}
          h={{ base: '100px' }}
          p={{ base: '16px' }}
          align="center"
          justify="flex-start"
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="2xl"
          rounded="lg"
          zIndex={1}
          _hover={{
            color: 'white',
            background: 'blackAlpha.900',
          }}
        >
          <Icon as={icon} h={{ base: '16px' }} mx={{ base: '32px' }} />
          <Heading fontSize={{ base: '16px' }} fontFamily="body" fontWeight={500}>
            {title}
          </Heading>
        </Flex>
      </Link>
    </Center>
  );
}
