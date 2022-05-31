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

import { FORGOT_PASSWORD_INITIAL_VALUES } from 'helpers/formInitialValues';
import { PASSWORD_RECOVERY_SCHEMA } from 'helpers/validationSchemas';
import { REQUEST_RESET_PASSWORD } from 'services/mutations';
import { useMutation } from 'react-query';

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ visibilityHandler }) => {
  const toast = useToast();
  const { mutateAsync: resetPassword } = useMutation(REQUEST_RESET_PASSWORD, {});

  const onSubmit = async (
    values: ForgotPasswordFormValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormValues>,
  ) => {
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
      <Flex p={6} flex={1} justify="center">
        <Stack spacing={1} w="full" maxW="md" justify="center">
          <Formik
            initialValues={FORGOT_PASSWORD_INITIAL_VALUES}
            onSubmit={onSubmit}
            validationSchema={PASSWORD_RECOVERY_SCHEMA}
          >
            {({
 errors, touched, handleSubmit, handleChange, isSubmitting,
}) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <Text fontSize={{ base: '16px' }} textAlign="center" mb={10}>
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
                    minW="100%"
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
