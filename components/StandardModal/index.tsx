import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import React from 'react'

export const StandardModal = ({
  isOpen,
  onClose,
  children,
  ...rest
}: ModalProps & { children: React.ReactNode }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    isCentered
    size="2lg"
    scrollBehavior="inside"
    {...rest}
  >
    <ModalOverlay />
    <ModalContent
      bgSize="cover"
      bgPosition="center"
      d="flex"
      justifyContent="center"
    >
      <ModalCloseButton />

      <ModalHeader
        d="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      />

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
        {children}
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  </Modal>
)
