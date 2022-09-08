import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

import { GET_USERS } from 'services/queries'
import { booleanToString } from 'helpers/formatters'
import { differenceInYears } from 'date-fns'
import { inHours } from 'helpers/time'
import { useQuery } from 'react-query'

const UsersTable: React.FC = () => {
  const { data } = useQuery('users', GET_USERS, {
    staleTime: inHours(24),
    cacheTime: inHours(24),
  })

  const users = data?.data || []

  return (
    <TableContainer w={{ base: '100%' }} fontSize={{ base: '12px' }}>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Telefone</Th>
            <Th>Idade</Th>
            <Th>Data de nascimento</Th>
            <Th>Ativo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(({ name, id, email, phone, active, birthdate }) => (
            <Tr key={id}>
              <Td>{name}</Td>
              <Td>{email}</Td>
              <Td>{phone}</Td>
              <Td>{differenceInYears(Date.now(), new Date(birthdate))}</Td>
              <Td>{new Date(birthdate).toLocaleDateString()}</Td>
              <Td>{booleanToString(active)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default UsersTable
