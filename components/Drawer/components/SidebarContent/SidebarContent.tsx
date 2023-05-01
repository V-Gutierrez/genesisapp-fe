import { Box, BoxProps, CloseButton, Divider, Flex, useColorModeValue } from '@chakra-ui/react'

import { useUser } from 'context/UserContext'
import { ArrowDownIcon } from '@chakra-ui/icons'
import MenuDropdown from 'components/MenuDropdown'

import { LinkItems, SpecialEventsLinks, AdminItems, SecondChunkOfLinkItems } from 'components/Drawer/utils'
import NavItem from './components/NavItem'

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

      <MenuDropdown icon={ArrowDownIcon} title="Galerias Especiais">
        {SpecialEventsLinks.map((link) => (
          <NavItem onClick={onClose} key={link.name} icon={link.icon} goTo={link.goTo}>
            {link.name}
          </NavItem>
        ))}
      </MenuDropdown>

      {SecondChunkOfLinkItems.map((link) => (
        <NavItem onClick={onClose} key={link.name} icon={link.icon} goTo={link.goTo}>
          {link.name}
        </NavItem>
      ))}
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
