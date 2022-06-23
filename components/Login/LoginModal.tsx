import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

import ForgotPasswordForm from 'components/Login/ForgotPasswordForm'
import Success from 'components/Success'
import { useState } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, refetchUser }) => {
  const [visibility, setVisibility] = useState({
    signUp: false,
    login: true,
    signUpSuccess: false,
    forgotPassword: false,
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="sm"
      scrollBehavior="outside"
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent bgSize="cover" bgPosition="center" d="flex" justifyContent="center">
        <ModalCloseButton />
        {!visibility.signUp && (
          <ModalHeader
            d="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          />
        )}
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
          {visibility.forgotPassword && <ForgotPasswordForm visibilityHandler={setVisibility} />}

          {visibility.signUpSuccess && (
            <Success
              title="Cadastro concluído com sucesso!"
              subtitle=" Você receberá um email com o link de ativação da sua conta. Após a ativação você conseguirá logar na plataforma!"
            />
          )}
        </ModalBody>
        {!visibility.signUp && <ModalFooter />}
      </ModalContent>
    </Modal>
  )
}

export default LoginModal
