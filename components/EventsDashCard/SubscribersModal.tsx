import {
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'

import UserRow from 'components/UserRow'

export default function SubscribersModal({
  isOpen,
  onClose,
  subscriptions,
}: ModalProps & { subscriptions: ExternalEventSubscriptions[] }) {
  const [search, setSearch] = useState('')
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bgSize="cover" bgPosition="center" d="flex" justifyContent="center">
        <ModalCloseButton />
        <ModalHeader d="flex" alignItems="center" justifyContent="center" flexDirection="column" />

        <ModalBody
          css={{
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '10px',
            },
          }}
        >
          <Flex m={2} position="sticky" top={0}>
            <Input
              placeholder="Pesquisar por nome ou email"
              onChange={(e: any) => setSearch(e.target.value as string)}
            />
          </Flex>
          {!subscriptions?.length && (
            <Flex w="full" h="300px" align="center" justifyContent="center">
              <Text>Nenhum inscrito</Text>
            </Flex>
          )}

          {subscriptions?.length ? (
            <UserRow
              name="Nome"
              phone="Telefone"
              email="Email"
              createdAt="Data de inscrição"
              index={1}
              action="Ação"
              isHead
            />
          ) : null}

          {subscriptions.length
            ? subscriptions.map((subscription, index) => {
                if (
                  subscription.name.toLowerCase().includes(search.toLowerCase())
                  || subscription.email.toLowerCase().includes(search.toLowerCase())
                ) {
                  return <UserRow key={subscription.id} {...subscription} index={index} />
                }
                return null
              })
            : null}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
