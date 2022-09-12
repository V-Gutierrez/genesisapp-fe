import { StandardModal } from 'components/StandardModal'

import NewsEditor from 'sections/Admin/News/components/NewsEditor'

const NewsCreationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <StandardModal isOpen={isOpen} onClose={onClose}>
    <NewsEditor onClose={onClose} />
  </StandardModal>
)

export default NewsCreationModal
