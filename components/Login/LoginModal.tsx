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
import Success from 'components/Success';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, refetchUser }) => {
  const [visibility, setVisibility] = useState({
    signUp: false,
    login: true,
    signUpSuccess: false,
    forgotPassword: false,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md" scrollBehavior="outside">
      <ModalOverlay />
      <ModalContent bgSize="cover" bgPosition="center" d="flex" justifyContent="center">
        <ModalCloseButton />
        <ModalHeader d="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <Image src={GenesisLogo.src} w="40%" my="10px" alt="Genesis Logo" />
        </ModalHeader>
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
          {visibility.login && (
            <LoginForm
              onClose={onClose}
              visibilityHandler={setVisibility}
              refetchUser={refetchUser}
            />
          )}
          {visibility.signUp && <SignUpForm visibilityHandler={setVisibility} />}
          {visibility.signUpSuccess && (
            <Success
              title="Cadastro concluído com sucesso!"
              subtitle=" Você receberá um email com o link de ativação da sua conta. Após a ativação você conseguirá logar na plataforma!"
            />
          )}
          {/* {visibility.forgotPassword && <ForgotPasswordForm />} */}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
