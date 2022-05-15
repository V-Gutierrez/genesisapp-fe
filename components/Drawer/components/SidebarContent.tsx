import {
  Box, BoxProps, CloseButton, Flex, useColorModeValue,
} from '@chakra-ui/react';
import { FiHome, FiStar } from 'react-icons/fi';

import NavItem from 'components/Drawer/components/NavItem';

const SidebarContent = ({ onClose, ...rest }: SidebarProps & BoxProps) => {
  const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiStar, goTo: '/' },
    { name: 'Encontre seu GC', icon: FiHome, goTo: '/findyourgc' },
  ];

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} goTo={link.goTo}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
