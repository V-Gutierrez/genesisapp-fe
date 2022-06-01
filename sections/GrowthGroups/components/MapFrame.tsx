import { Flex, Text } from '@chakra-ui/react';

import React from 'react';

function MapFrame() {
  return (
    <Flex
      align="center"
      justify="center"
      h="100%"
      bg="blackAlpha.200"
      w={{
        lg: '80%',
        md: '100%',
        sm: '100%',
        base: '100%',
      }}
      borderRadius="lg"
    >
      <Text>Mapa indisponível no momento</Text>
    </Flex>
  );
}

export default MapFrame;
