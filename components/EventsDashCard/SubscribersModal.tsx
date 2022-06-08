import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import React from 'react';
import UserRow from 'components/UserRow';

export default function SubscribersModal({
  isOpen,
  onClose,
  subscriptions,
}: ModalProps & { subscriptions: ExternalEventSubscriptions[] }) {
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
          {!subscriptions?.length && (
            <Flex w="full" h="300px" align="center" justifyContent="center">
              <Text>Nenhum inscrito</Text>
            </Flex>
          )}

          {subscriptions && subscriptions.length && (
            <UserRow
              name="Nome"
              phone="Telefone"
              email="Email"
              createdAt="Data de inscrição"
              index={1}
            />
          )}
          {subscriptions
            && subscriptions.length
            && subscriptions.map((subscription, index) => (
              <UserRow key={subscription.id} {...subscription} index={index} />
            ))}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
