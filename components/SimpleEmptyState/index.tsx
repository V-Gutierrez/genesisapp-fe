import { Flex, Text } from '@chakra-ui/react';

import React from 'react';

const SimpleEmptyState: React.FC<SimpleEmptyStateProps> = ({ title }) => (
    <Flex h="80vh" w="full" justifyContent="center" alignItems="center">
      <Text fontSize={{ base: '16px', md: '18px' }}>
        {title}
      </Text>
    </Flex>
  )

export default SimpleEmptyState;
