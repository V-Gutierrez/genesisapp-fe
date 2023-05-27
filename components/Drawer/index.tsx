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

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { route } = useRouter()
  const isFetching = useIsFetching()
  const extraordinaryPage = extraordinaryRoutes.includes(route)
  const generalHeight = extraordinaryPage ? '100vh' : '80vh'
  const generalPadding = extraordinaryPage ? '0' : '1'

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
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
      <Box ml={0} p={generalPadding}>
        {isFetching ? (
          <Flex
            w="100%"
            h={generalHeight}
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
