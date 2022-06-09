import { Flex, Text } from '@chakra-ui/react'

import React from 'react'

const UserRow: React.FC<
  Partial<ExternalEventSubscriptions> & { index: number; isHead?: boolean }
> = ({
 name, email, phone, createdAt, index, isHead = false,
}) => (
  <Flex
    w="100%"
    minH="20px"
    justifyContent="space-evenly"
    alignItems="center"
    bg={index % 2 ? 'white' : 'gray.200'}
  >
    <Text textAlign="center" fontSize={{ base: '12px' }} w="25%">
      {name}
    </Text>
    <Text textAlign="center" fontSize={{ base: '12px' }} w="25%">
      {email}
    </Text>
    <Text textAlign="center" fontSize={{ base: '12px' }} w="25%">
      {phone}
    </Text>
    <Text textAlign="center" fontSize={{ base: '12px' }} w="25%">
      {isHead ? createdAt : new Date(createdAt as string).toLocaleString()}
    </Text>
  </Flex>
)

export default UserRow
