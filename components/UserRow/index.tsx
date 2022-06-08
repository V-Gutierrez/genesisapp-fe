import { Flex, Text } from '@chakra-ui/react';

import React from 'react';

const UserRow: React.FC<Partial<ExternalEventSubscriptions> & { index: number }> = ({
  name,
  email,
  phone,
  createdAt,
  index,
}) => (
    <Flex
      w="100%"
      minH="20px"
      justifyContent="space-evenly"
      alignItems="center"
      bg={index % 2 ? 'white' : 'gray.200'}
    >
      <Text textAlign="center" flex={1}>
        {name}
      </Text>
      <Text textAlign="center" flex={1}>
        {email}
      </Text>
      <Text textAlign="center" flex={1}>
        {phone}
      </Text>
      <Text textAlign="center" flex={1}>
        {createdAt}
      </Text>
    </Flex>
  );

export default UserRow;
