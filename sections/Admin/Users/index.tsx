import { Flex } from '@chakra-ui/react'
import UsersTable from 'components/UsersTable'

const Users: React.FC = () => (
  <Flex w="full" justify="center" align="center" minH={{ base: '300px' }}>
    <UsersTable />
  </Flex>
)

export default Users
