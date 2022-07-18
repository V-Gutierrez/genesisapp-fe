import { Box, BoxProps, CloseButton, Divider, Flex, useColorModeValue } from '@chakra-ui/react'
import { MdOutlineLeaderboard } from 'react-icons/md'
import { useUser } from 'context/UserContext'
import MenuDropdown from 'components/MenuDropdown'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { BiCake } from 'react-icons/bi'
import { LinkItems } from 'components/Drawer/utils'
import NavItem from './components/NavItem'

const SpecialEventsLinks: Array<LinkItemProps> = [
  { name: 'Aniversário de 13 anos', icon: BiCake, goTo: '/eventos/13anosgenesis' },
]

const AdminItems: Array<LinkItemProps> = [
  { name: 'Administração', icon: MdOutlineLeaderboard, goTo: '/admin' },
]

const SidebarContent = ({ onClose, ...rest }: SidebarProps & BoxProps) => {
  const { isAdmin } = useUser()

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: '85%', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {/* Sidebar Items */}
      {LinkItems.map((link) => (
        <NavItem onClick={onClose} key={link.name} icon={link.icon} goTo={link.goTo}>
          {link.name}
        </NavItem>
      ))}

      <MenuDropdown icon={ChevronDownIcon} title="Eventos Especiais">
        {SpecialEventsLinks.map((link) => (
          <NavItem onClick={onClose} key={link.name} icon={link.icon} goTo={link.goTo}>
            {link.name}
          </NavItem>
        ))}
      </MenuDropdown>
      {/* Sidebar Items */}

      {isAdmin && <Divider my={{ base: '10px' }} />}
      {isAdmin &&
        AdminItems.map((link) => (
          <NavItem onClick={onClose} key={link.name} icon={link.icon} goTo={link.goTo}>
            {link.name}
          </NavItem>
        ))}
    </Box>
  )
}

export default SidebarContent
