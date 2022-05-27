import {
  Box, BoxProps, CloseButton, Divider, Flex, useColorModeValue,
} from '@chakra-ui/react';
import { FiHome, FiStar } from 'react-icons/fi';

import { MdOutlineLeaderboard } from 'react-icons/md';
import { useUser } from 'context/UserContext';
import NavItem from './components/NavItem';

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiStar, goTo: '/' },
  { name: 'Encontre seu GC', icon: FiHome, goTo: '/gc' },
];

const AdminItems: Array<LinkItemProps> = [
  { name: 'Administração', icon: MdOutlineLeaderboard, goTo: '/admin' },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps & BoxProps) => {
  const { isAdmin } = useUser();

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
      onClick={onClose}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} goTo={link.goTo}>
          {link.name}
        </NavItem>
      ))}

      {isAdmin && <Divider my={{ base: '10px' }} />}
      {isAdmin
        && AdminItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} goTo={link.goTo}>
            {link.name}
          </NavItem>
        ))}
    </Box>
  );
};

export default SidebarContent;
