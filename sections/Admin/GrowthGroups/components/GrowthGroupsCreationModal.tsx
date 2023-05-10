import { StandardModal } from 'components/StandardModal'
import GrowthGroupEditor from 'sections/Admin/GrowthGroups/components/GrowthGroupEditor'

const GrowthGroupsCreationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <StandardModal isOpen={isOpen} onClose={onClose}>
    <GrowthGroupEditor onClose={onClose} />
  </StandardModal>
)

export default GrowthGroupsCreationModal
