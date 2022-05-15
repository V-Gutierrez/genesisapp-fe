import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

import MobileNav from 'components/Drawer/components/MobileNav';
import SidebarContent from 'components/Drawer/components/SidebarContent';
import { useIsFetching } from 'react-query';

export default function SidebarWithHeader({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isFetching = useIsFetching();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {isFetching ? (
          <Flex h="90vh" w="100%" justifyContent="center" alignItems="center">
            <Spinner size="xl" />
          </Flex>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
}
