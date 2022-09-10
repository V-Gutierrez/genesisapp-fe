import { StandardModal } from 'components/StandardModal'
import EventEditor from 'sections/Admin/Events/components/EventEditor'

const EventCreationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <StandardModal isOpen={isOpen} onClose={onClose}>
    <EventEditor onClose={onClose} />
  </StandardModal>
)

export default EventCreationModal
