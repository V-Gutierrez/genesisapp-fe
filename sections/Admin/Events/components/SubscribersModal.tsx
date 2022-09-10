import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from '@chakra-ui/react'
import SimpleEmptyState from 'components/SimpleEmptyState'
import SubscribersTable from 'components/SubscribersTable'
import React, { useState } from 'react'

export default function SubscribersModal({ isOpen, onClose, subscribers }: SubscribersModalProps) {
  const [filteredSubscribers, setSubscribers] = useState(subscribers)

  const handleSubscriptionFiltering = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    const newFilteredSubscribersValue = subscribers.filter(
      (item) =>
        item.userEmail.includes(value) ||
        item.userName.includes(value) ||
        item.userPhone.includes(value),
    )

    setSubscribers(newFilteredSubscribersValue)
  }

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
          {!subscribers.length ? (
            <SimpleEmptyState title="Nenhum inscrito até o momento" />
          ) : (
            <>
              <Input
                onChange={handleSubscriptionFiltering}
                placeholder="Pesquise uma inscrição por aqui"
                my={5}
              />
              <SubscribersTable subscribers={filteredSubscribers} />
            </>
          )}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
