import * as Yup from 'yup';

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
} from '@chakra-ui/react';
import { Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';

import Axios from 'services/axios';
import Error from 'components/Error';
import PasswordValidator from 'components/Login/components/PasswordValidator';
import Success from 'components/Success';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

const INITIAL_VALUES = {
  password: '',
  passwordConfirmation: '',
};

interface FormValues {
  password: string;
  passwordConfirmation: string;
}

const RESET_PASSWORD_SCHEMA = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Sua senha deve ter no mínimo 8 caractéres')
    .matches(/[a-z]/, 'Sua senha deve conter letras minúsculas')
    .matches(/[A-Z]/, 'Sua senha deve conter letras maiúsculas')
    .matches(/[0-9]/, 'Sua senha deve conter números')
    .matches(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'Sua senha deve conter caracteres especiais')
    .required('Insira uma senha'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas devem coincidir',
  ),
});

const mutation = async ({ token, newPassword }: { token: string; newPassword: string }) => Axios.put(
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
  const { mutateAsync: changePassword, isSuccess, isError } = useMutation(mutation, {});
  const [show, setShow] = useState(false);
  const { query, push } = useRouter();

  const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setSubmitting(true);

    if (!query?.token) push('/');
    else {
      await changePassword({ token: query?.token as string, newPassword: values.password });
      setSubmitting(false);
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
        initialValues={INITIAL_VALUES}
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
