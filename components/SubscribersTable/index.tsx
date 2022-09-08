import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import SimpleEmptyState from 'components/SimpleEmptyState'
import { useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { useMutation } from 'react-query'
import { DELETE_EVENT_SUBSCRIPTION } from 'services/mutations'

const SubscribersTable: React.FC<SubscribersTableProps> = ({ subscribers }) => {
  const { mutateAsync: deleteSubscription } = useMutation(DELETE_EVENT_SUBSCRIPTION)
  const toast = useToast()
  const [subscriptionsCopy, setSubscriptionCopy] = useState(subscribers)

  const handleDeleteSubscription = async (id: string) => {
    const userConfirmation = confirm('Deseja deletar essa inscrição?')

    if (!userConfirmation) return
    try {
      await deleteSubscription(id)
      setSubscriptionCopy(subscriptionsCopy.filter((item) => item.id !== id))
      toast({
        description: 'Inscrição deletada com sucesso',
        status: 'success',
      })
    } catch (error) {
      toast({
        status: 'error',
        description: 'Houve um erro ao deletar a inscrição. Contate o suporte.',
      })
    }
  }

  if (!subscribers.length) {
    return <SimpleEmptyState title="Nenhum inscrito até o momento" />
  }

  return (
    <TableContainer w={{ base: '100%' }} fontSize={{ base: '12px' }}>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Telefone</Th>
            <Th>Ação</Th>
          </Tr>
        </Thead>
        <Tbody>
          {subscriptionsCopy.map(({ id, userName, userEmail, userPhone }) => (
            <Tr key={id}>
              <Td>{userName}</Td>
              <Td>{userEmail}</Td>
              <Td>{userPhone}</Td>
              <Td cursor="pointer" onClick={() => handleDeleteSubscription(id)}>
                <GrClose />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default SubscribersTable
