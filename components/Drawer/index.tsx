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

import Header from 'components/Drawer/components/SidebarContent/components/Header';
import SidebarContent from 'components/Drawer/components/SidebarContent/SidebarContent';
import { useIsFetching } from 'react-query';

export default function SidebarWithHeader({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isFetching = useIsFetching();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: '' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent bg="none" boxShadow="none">
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 0 }} p="4">
        {isFetching ? (
          <Flex w="100%" justifyContent="center" alignItems="center">
            <Spinner size="xl" />
          </Flex>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
}
