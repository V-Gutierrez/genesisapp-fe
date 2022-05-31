import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import DevotionalEditor from 'sections/Admin/Devotionals/components/DevotionalEditor';
import React from 'react';

const DevotionalCreationModal: React.FC<DevotionalCreationModalProps> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" scrollBehavior="outside">
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
        <DevotionalEditor />
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  </Modal>
);

export default DevotionalCreationModal;
