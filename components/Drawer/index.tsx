import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import Header from 'components/Drawer/components/SidebarContent/components/Header'
import SidebarContent from 'components/Drawer/components/SidebarContent/SidebarContent'
import { extraordinaryRoutes } from 'components/Drawer/utils'
import { useIsFetching } from 'react-query'
import { useRouter } from 'next/router'

export default function SidebarWithHeader({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { route } = useRouter()
  const isFetching = useIsFetching()
  const extraordinaryPage = extraordinaryRoutes.includes(route)

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
        preserveScrollBarGap
      >
        <DrawerContent bg="none" boxShadow="none">
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {!extraordinaryPage && <Header onOpen={onOpen} />}
      <Box ml={{ base: 0, md: 0 }} p={extraordinaryPage ? '0' : '4'}>
        {isFetching ? (
          <Flex
            w="100%"
            h={extraordinaryPage ? '100vh' : '80vh'}
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size="xl" />
          </Flex>
        ) : (
          children
        )}
      </Box>
    </Box>
  )
}
