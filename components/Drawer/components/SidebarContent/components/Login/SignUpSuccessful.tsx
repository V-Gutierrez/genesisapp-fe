import { Box, Heading, Text } from '@chakra-ui/react';

import { CheckCircleIcon } from '@chakra-ui/icons';

export default function SignUpSuccess() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize="50px" color="black.500" />
      <Heading as="h2" size="xl" mt={6} mb={5}>
        Cadastro concluído com sucesso!
      </Heading>
      <Text color="gray.500">
        Você receberá um email com o link de ativação da sua conta. Após a ativação você conseguirá
        logar na plataforma!
      </Text>
    </Box>
  );
}
