import { Input } from '@chakra-ui/react'
import SimpleEmptyState from 'components/SimpleEmptyState'
import { StandardModal } from 'components/StandardModal'
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
    <StandardModal isOpen={isOpen} onClose={onClose}>
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
    </StandardModal>
  )
}
