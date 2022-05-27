import { BiHide, BiShowAlt } from 'react-icons/bi';
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';

import { LOGIN } from 'services/mutations';
import { LOGIN_INITIAL_VALUES } from 'helpers/initialValues';
import { LOGIN_SCHEMA } from 'helpers/schema';
import { useMutation } from 'react-query';

const LoginForm: React.FC<LoginFormProps> = ({ onClose, visibilityHandler, refetchUser }) => {
  const { mutateAsync: login } = useMutation(LOGIN, {});
  const [show, setShow] = useState(false);
  const toast = useToast();

  const onSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
  ) => {
    setSubmitting(true);
    try {
      await login(values);
      toast({
        title: 'Login realizado com sucesso',
        status: 'success',
      });
      await refetchUser();
      onClose();
    } catch (e) {
      toast({
        title: 'Usuário e senha inválidos',
        status: 'error',
      });
    }
    setSubmitting(false);
  };
  const handleClick = () => setShow(!show);

  const handleSignUp = () => {
    visibilityHandler({ login: false, signUp: true });
  };
  const handleSeePasswordRecovery = () => {
    visibilityHandler({ forgotPassword: true, login: false });
  };

  return (
    <Stack minH={{ base: '20vh' }} direction={{ base: 'column', md: 'row' }} flex="1">
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={4} w="full" maxW="md">
          <Formik
            initialValues={LOGIN_INITIAL_VALUES}
            onSubmit={onSubmit}
            validationSchema={LOGIN_SCHEMA}
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
                    <InputGroup>
                      <Input
                        id="password"
                        onChange={handleChange}
                        type={show ? 'text' : 'password'}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          bg="none"
                          borderRadius="100%"
                          onClick={handleClick}
                        >
                          {show ? <BiHide size="24px" /> : <BiShowAlt size="24px" />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <Text fontSize={{ base: '12px' }} color="red">
                      {errors.password && touched.password && errors.password}
                    </Text>
                  </Box>
                </Stack>

                <Stack spacing={6} mt={6}>
                  <Stack
                    direction={{ base: 'row', sm: 'row' }}
                    align="start"
                    justify="space-between"
                  >
                    <Link
                      color="blue.500"
                      fontSize={{ base: '12px', md: '14px' }}
                      onClick={handleSeePasswordRecovery}
                    >
                      Esqueci a senha
                    </Link>
                    <Link
                      color="blue.500"
                      fontSize={{ base: '12px', md: '14px' }}
                      onClick={handleSignUp}
                    >
                      Não tenho cadastro
                    </Link>
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
  );
};

export default LoginForm;
