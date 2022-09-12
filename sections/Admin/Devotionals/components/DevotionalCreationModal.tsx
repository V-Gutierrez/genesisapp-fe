import { StandardModal } from 'components/StandardModal'

import DevotionalEditor from 'sections/Admin/Devotionals/components/DevotionalEditor'

const DevotionalCreationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <StandardModal isOpen={isOpen} onClose={onClose}>
    <DevotionalEditor onClose={onClose} />
  </StandardModal>
)

export default DevotionalCreationModal
