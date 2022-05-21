import * as Yup from 'yup';

import {
  Box,
  Button,
  Flex,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Formik, FormikHelpers } from 'formik';

import Axios from 'services/axios';
import GenesisLogo from 'assets/images/genesislogo.png';
import { useMutation } from 'react-query';

const INITIAL_VALUES = { email: '', password: '' };
const SIGNUP_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Insira um email válido').required('Insira um email válido'),
  password: Yup.string().required('Insira uma senha'),
});

interface FormValues {
  email: string;
  password: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const mutation = async (values: FormValues) => {
    await Axios.post('/auth', {
      email: values.email,
      password: values.password,
    });
  };
  const { mutateAsync: login } = useMutation(mutation, {});
  const toast = useToast();

  const onSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    actions.setSubmitting(true);

    try {
      await login(values);

      toast({
        title: 'Login realizado com sucesso',
        status: 'success',
        position: 'bottom',
      });
    } catch (e) {
      toast({
        title: 'Usuário ou senha inválidos',
        status: 'error',
        position: 'bottom',
      });
    }
    actions.setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
      <ModalOverlay />
      <ModalContent bgSize="cover" bgPosition="center">
        <ModalCloseButton />
        <ModalHeader d="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <Image src={GenesisLogo.src} w="40%" my="30px" alt="Genesis Logo" />
        </ModalHeader>

        <ModalBody>
          <Stack minH={{ base: '20vh' }} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align="center" justify="center">
              <Stack spacing={4} w="full" maxW="md">
                <Formik
                  initialValues={INITIAL_VALUES}
                  onSubmit={onSubmit}
                  validationSchema={SIGNUP_SCHEMA}
                >
                  {({
                    errors, touched, handleSubmit, handleChange, isValid, isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={6}>
                        <Box>
                          <FormLabel fontSize={{ base: '18px' }}>Email</FormLabel>
                          <Input type="email" id="email" onChange={handleChange} />
                          <Text fontSize={{ base: '12px' }} color="red">
                            {errors.email && touched.email && errors.email}
                          </Text>
                        </Box>

                        <Box>
                          <FormLabel fontSize={{ base: '18px' }}>Senha</FormLabel>
                          <Input type="password" id="password" onChange={handleChange} />
                          <Text fontSize={{ base: '12px' }} color="red">
                            {errors.password && touched.password && errors.password}
                          </Text>
                        </Box>
                      </Stack>

                      <Stack spacing={6} mt={6}>
                        <Stack
                          direction={{ base: 'column', sm: 'row' }}
                          align="start"
                          justify="space-between"
                        >
                          {/* FORGOT PASSWORD LOGIC */}
                          {/* <Link color={'blue.500'}>Esqueci a senha</Link> */}
                          {/* FORGOT PASSWORD LOGIC */}
                        </Stack>
                        <Button
                          disabled={!isValid}
                          colorScheme="blackAlpha"
                          type="submit"
                          bg="blackAlpha.900"
                          variant="solid"
                        >
                          {isSubmitting ? <Spinner /> : 'Entrar'}
                        </Button>
                      </Stack>
                    </form>
                  )}
                </Formik>
              </Stack>
            </Flex>
          </Stack>
          <ModalFooter />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;