import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import EventEditor from 'sections/Admin/Events/components/EventEditor';

const EventCreationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
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
        <EventEditor onClose={onClose} />
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  </Modal>
);

export default EventCreationModal;
