import { Flex } from '@chakra-ui/react'
import React from 'react'
import Success from 'components/Success'

const SubscriptionForm: React.FC<{ id: string }> = ({ id }) => (
    <Flex w="full" mt="50px" justify="center" align="center" pb="200px">
      <Success
        title="Evento finalizado!"
        subtitle="Obrigado a todos os participantes! #13anosgenesis"
      />
    </Flex>
  )

export default SubscriptionForm
