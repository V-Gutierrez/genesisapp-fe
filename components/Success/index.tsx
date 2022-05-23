import { Box, Heading, Text } from '@chakra-ui/react';

import { CheckCircleIcon } from '@chakra-ui/icons';

export default function Success({ title, subtitle }: SuccessProps) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize="50px" color="black.500" />
      <Heading as="h2" size="xl" mt={6} mb={5}>
        {title}
      </Heading>
      <Text color="gray.500">{subtitle}</Text>
    </Box>
  );
}
