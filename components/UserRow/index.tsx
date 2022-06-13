import { Flex, Text, useToast } from '@chakra-ui/react'
import React, { useRef } from 'react'

import Axios from 'services/axios'
import { CloseIcon } from '@chakra-ui/icons'

const UserRow: React.FC<
  Partial<ExternalEventSubscriptions> & { index: number; isHead?: boolean; action?: string }
> = ({
 name, email, phone, createdAt, index, isHead = false, id, action,
}) => {
  const toast = useToast()
  const ref = useRef(null)

  const exclude = async () => {
    try {
      if (confirm('Deseja realmente excluir?')) {
        await Axios.delete(`/externalsubscriptions/${id}`)

        toast({
          title: 'Inscrição excluída',
          description: 'Inscrição excluída com sucesso',
          status: 'success',
        })

        /* @ts-ignore */
        ref.current.style.display = 'none'
      }
    } catch (error) {
      toast({
        title: 'Houve um erro ao excluir a inscrição',
        status: 'error',
      })
      console.log(error)
    }
  }

  return (
    <Flex
      w="100%"
      minH="20px"
      ref={ref}
      justifyContent="space-evenly"
      alignItems="center"
      bg={index % 2 ? 'white' : 'gray.200'}
      fontWeight={isHead ? 'bold' : 'normal'}
      border="1px solid black"
    >
      <Text textAlign="center" fontSize={{ base: '12px' }} w="24%">
        {name}
      </Text>
      <Text textAlign="center" fontSize={{ base: '12px' }} w="24%">
        {email}
      </Text>
      <Text textAlign="center" fontSize={{ base: '12px' }} w="24%">
        {phone}
      </Text>
      <Text textAlign="center" fontSize={{ base: '12px' }} w="24%">
        {isHead ? createdAt : new Date(createdAt as string).toLocaleString()}
      </Text>
      <Text textAlign="center" fontSize={{ base: '12px' }} w="4%" cursor="pointer">
        {isHead ? action : <CloseIcon onClick={exclude} />}
      </Text>
    </Flex>
  )
}

export default UserRow
