import { BiHide, BiShowAlt } from 'react-icons/bi';
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';

import Axios from 'services/axios';
import Error from 'components/Error';
import PasswordValidator from 'components/Login/components/PasswordValidator';
import { RESET_PASSWORD_INITIAL_VALUES } from 'helpers/initialValues';
import { RESET_PASSWORD_SCHEMA } from 'helpers/schema';
import Success from 'components/Success';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

interface FormValues {
  password: string;
  passwordConfirmation: string;
}

const Mutation = async ({ token, newPassword }: { token: string; newPassword: string }) => Axios.put(
  '/auth/reset-password',
  {
    password: newPassword,
  },
  {
    headers: {
      Authorization: token,
    },
  },
);

const ResetPassword: React.FC = () => {
  const { mutateAsync: changePassword, isSuccess, isError } = useMutation(Mutation, {});
  const [show, setShow] = useState(false);
  const { query, push } = useRouter();
  const toast = useToast();

  const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setSubmitting(true);

    if (!query?.token) push('/');
    else {
      await changePassword({ token: query?.token as string, newPassword: values.password });

      const toastDelay = setTimeout(() => {
        toast({
          title: 'Você será redirecionado para a página inicial',
          duration: 5000,
          status: 'info',
        });
        clearTimeout(toastDelay);
      }, 2500);

      const delay = setTimeout(() => {
        clearTimeout(delay);
        push('/');
      }, 5000);
    }
  };

  const handleSeePassword = () => setShow(!show);

  if (isSuccess) {
    return (
      <Flex h="80vh" align="center" justify="center">
        <Success
          title="Senha redefinida com sucesso!"
          subtitle="Agora você já pode logar com a sua nova senha."
        />
      </Flex>
    );
  }
  if (isError) {
    return (
      <Flex h="80vh" align="center" justify="center">
        <Error
          title="Oops!"
          subtitle="Houve um problema ao redefinir sua senha. Contate o suporte."
        />
      </Flex>
    );
  }

  return (
    <Flex h="80vh" align="center" justify="center">
      <Formik
        initialValues={RESET_PASSWORD_INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={RESET_PASSWORD_SCHEMA}
      >
        {({
          errors, touched, handleSubmit, handleChange, isSubmitting, values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Box>
                <FormLabel fontSize={{ base: '16px' }}>Nova senha</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    onChange={handleChange}
                    type={show ? 'text' : 'password'}
                    background="white"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      bg="none"
                      borderRadius="100%"
                      onClick={handleSeePassword}
                    >
                      {show ? <BiHide size="24px" /> : <BiShowAlt size="24px" />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text fontSize={{ base: '12px' }} color="red">
                  {errors.password && touched.password && errors.password}
                </Text>
              </Box>

              <Box>
                <FormLabel fontSize={{ base: '16px' }}>Confirme sua nova senha</FormLabel>
                <InputGroup>
                  <Input
                    id="passwordConfirmation"
                    onChange={handleChange}
                    type={show ? 'text' : 'passwordConfirmation'}
                    background="white"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      bg="none"
                      borderRadius="100%"
                      onClick={handleSeePassword}
                    >
                      {show ? <BiHide size="24px" /> : <BiShowAlt size="24px" />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text fontSize={{ base: '12px' }} color="red">
                  {errors.passwordConfirmation
                    && touched.passwordConfirmation
                    && errors.passwordConfirmation}
                </Text>
              </Box>

              <PasswordValidator password={values.password} />
            </Stack>
            <Stack spacing={6} mt={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align="start"
                justify="space-between"
              />
              <Button colorScheme="blackAlpha" type="submit" bg="blackAlpha.900" variant="solid">
                {isSubmitting ? <Spinner /> : 'Continuar'}
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Flex>
  );
};

export default ResetPassword;
