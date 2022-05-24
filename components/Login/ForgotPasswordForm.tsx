import * as Yup from 'yup';

import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Formik, FormikHelpers } from 'formik';

import Axios from 'services/axios';
import { useMutation } from 'react-query';

const PASSWORD_RECOVERY_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Insira um email válido').required('Insira um email'),
});
interface FormValues {
  email: string;
}

const INITIAL_VALUES = {
  email: '',
};

const mutation = async (values: FormValues) => {
  await Axios.post<{ error: string }>('/auth/reset-password', {
    email: values.email,
  });
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ visibilityHandler }) => {
  const toast = useToast();
  const { mutateAsync: resetPassword } = useMutation(mutation, {});

  const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setSubmitting(true);
    try {
      await resetPassword(values);

      toast({
        title: 'Email de recuperação enviado!',
        status: 'info',
        description:
          'Você receberá um email de recuperação de senha. Caso não encontre, verifique sua caixa de spam.',
      });
      visibilityHandler({ forgotPassword: false, login: true });
    } catch (e) {
      toast({
        title: 'Erro',
        status: 'error',
        description:
          'Verifique se sua conta de email ou seu número de telefone já estão cadastrados na plataforma ou se o seu email foi digitado corretamente',
      });
    }
    setSubmitting(false);
  };

  const handleGoBackToLogin = () => {
    visibilityHandler({ forgotPassword: false, login: true });
  };

  return (
    <Stack minH={{ base: '20vh' }} direction={{ base: 'column', md: 'row' }}>
      <Flex p={6} flex={1} align="center" justify="center">
        <Stack spacing={1} w="full" maxW="md" justify="center">
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={onSubmit}
            validationSchema={PASSWORD_RECOVERY_SCHEMA}
          >
            {({
              errors, touched, handleSubmit, handleChange, isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <Text fontSize={{ base: '18px' }} textAlign="center" mb={10}>
                    Insira seu email cadastrado para receber um link de restauração de senha
                  </Text>
                  <FormLabel>
                    <HStack cursor="pointer">
                      <Text fontSize={{ base: '16px' }}>Email</Text>
                    </HStack>
                  </FormLabel>
                  <Input type="email" id="email" onChange={handleChange} />
                  <Text fontSize={{ base: '12px' }} color="red">
                    {errors.email && touched.email && errors.email}
                  </Text>
                </Box>
                <Box w="full" d="flex" alignItems="center" justifyContent="center" mb={6}>
                  <Button
                    colorScheme="blackAlpha"
                    type="submit"
                    bg="blackAlpha.900"
                    variant="solid"
                    minW="100px"
                    mt={10}
                  >
                    {isSubmitting ? <Spinner /> : 'Restaurar senha'}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Link color="blue.500" onClick={handleGoBackToLogin}>
            Voltar
          </Link>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default ForgotPassword;
