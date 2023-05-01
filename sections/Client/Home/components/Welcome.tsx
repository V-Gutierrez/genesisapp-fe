import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'

export default function Welcome() {
  const { isFetching } = useQuery('news')

  if (isFetching) return null
  return (
     <Flex pl={{ base: 2, md: 5 }} alignSelf="flex-start" flexDirection="column" w="100%" fontSize={{ base: '2xl', sm: '4xl' }} textAlign={{ base: 'left' }} mb={{ base: 4, sm: 2 }}>
        <Text fontFamily="Caveat" fontSize={{ base: '32px', sm: '45px' }}>Bem-vindos</Text>
        <Text>à família Gênesis</Text>
      </Flex>
  )
}
