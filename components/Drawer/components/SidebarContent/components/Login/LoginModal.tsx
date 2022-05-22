import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import GenesisLogo from 'assets/images/genesislogo.png';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [visibility, setVisibility] = useState({
    signUp: false,
    login: true,
    signUpSuccess: false,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
      <ModalOverlay />
      <ModalContent bgSize="cover" bgPosition="center">
        <ModalCloseButton />
        <ModalHeader d="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <Image src={GenesisLogo.src} w="40%" my="30px" alt="Genesis Logo" />
        </ModalHeader>
        <ModalBody>
          {visibility.login && <LoginForm onClose={onClose} visibilityHandler={setVisibility} />}
          {visibility.signUp && <SignUpForm visibilityHandler={setVisibility} />}
          {/* SignUp Successful */}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
