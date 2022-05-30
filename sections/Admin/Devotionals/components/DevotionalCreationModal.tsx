import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import React from 'react';

const DevotionalCreationModal: React.FC<DevotionalCreationModalProps> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered size="md" scrollBehavior="outside">
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
        {/* Editor */}
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  </Modal>
);

export default DevotionalCreationModal;
