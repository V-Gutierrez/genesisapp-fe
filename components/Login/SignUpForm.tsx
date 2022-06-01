import { BiHide, BiShowAlt } from 'react-icons/bi';
import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Link,
  Select,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import Flag from 'react-world-flags';
import InputMask from 'react-input-mask';
import PasswordValidator from 'components/Login/components/PasswordValidator';
import { SIGNUP_INITIAL_VALUES } from 'helpers/formInitialValues';
import { SIGNUP_SCHEMA } from 'helpers/validationSchemas';
import { SIGN_UP } from 'services/mutations';
import { useMutation } from 'react-query';

const SignUpForm: React.FC<SignUpFormProps> = ({ visibilityHandler }) => {
  const { mutateAsync: signup } = useMutation(SIGN_UP);
  const [show, setShow] = useState(false);
  const toast = useToast();

  const onSubmit = async (
    values: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>,
  ) => {
    setSubmitting(true);
    try {
      await signup(values);

      // Show Success result
      visibilityHandler({ signUpSuccess: true, signUp: false });
    } catch (e) {
      toast({
        title: 'Erro',
        status: 'error',
        description:
          'Verifique se sua conta de email ou seu número de telefone já estão cadastrados na plataforma',
      });
    }
    setSubmitting(false);
  };

  const handleSeePassword = () => setShow(!show);

  const handleGoBackToLogin = () => {
    visibilityHandler({ login: true, signUp: false });
  };

  return (
    <Stack minH={{ base: '20vh' }} direction={{ base: 'column', md: 'row' }}>
      <Flex p={6} flex={1} align="center" justify="center">
        <Stack spacing={1} w="full" maxW="md">
          <Formik
            initialValues={SIGNUP_INITIAL_VALUES}
            onSubmit={onSubmit}
            validationSchema={SIGNUP_SCHEMA}
          >
            {({
 errors, touched, handleSubmit, handleChange, isSubmitting, values,
}) => (
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <Box>
                    <FormLabel fontSize={{ base: '16px' }}>Nome e Sobrenome</FormLabel>
                    <Input type="name" id="name" onChange={handleChange} />
                    <Text fontSize={{ base: '12px' }} color="red">
                      {errors.name && touched.name && errors.name}
                    </Text>
                  </Box>

                  <Box>
                    <FormLabel>
                      <HStack cursor="pointer">
                        <Text fontSize={{ base: '16px' }}>Email</Text>
                        <Tooltip
                          shouldWrapChildren
                          hasArrow
                          placement="top"
                          label="Seu email será utilizado para confirmação de conta, recuperação de senha e notificação sobre cadastros, eventos, entre outros."
                        >
                          <AiOutlineInfoCircle />
                        </Tooltip>
                      </HStack>
                    </FormLabel>
                    <Input type="email" id="email" onChange={handleChange} />
                    <Text fontSize={{ base: '12px' }} color="red">
                      {errors.email && touched.email && errors.email}
                    </Text>
                  </Box>

                  <Box>
                    <FormLabel d="flex">
                      <HStack>
                        <Text fontSize={{ base: '16px' }}>Telefone</Text>
                        <Tooltip
                          shouldWrapChildren
                          hasArrow
                          cursor="pointer"
                          label="Seu telefone será utilizado para notificá-lo sobre eventos, devocionais, entre outros via SMS."
                          placement="top"
                        >
                          <AiOutlineInfoCircle />
                        </Tooltip>
                      </HStack>
                    </FormLabel>

                    <InputGroup>
                      <InputLeftAddon
                        padding="0"
                        bg="none"
                        border="none"
                        children={(
                          <Box d="flex" alignItems="center" justifyContent="space-evenly">
                            <Select
                              id="region"
                              w={{ base: '80px' }}
                              bg="white"
                              onChange={handleChange}
                              fontSize={{ base: '12px' }}
                            >
                              <option value="+54">ARG</option>
                              <option value="+55">BRA</option>
                            </Select>
                          </Box>
                        )}
                      />

                      <Input
                        type="tel"
                        id="phone"
                        as={InputMask}
                        mask={
                          values.region === '+54'
                            ? `${values.region} * ** ****-****`
                            : `${values.region} ** * ****-****`
                        }
                        onChange={handleChange}
                      />
                      <InputRightElement
                        padding="0"
                        bg="none"
                        border="none"
                        children={(
                          <Box w={{ base: '20px' }}>
                            <Flag code={values.region === '+55' ? 'bra' : 'arg'} height="10" />
                          </Box>
                        )}
                      />
                    </InputGroup>
                    <Text fontSize={{ base: '12px' }} color="red">
                      {errors.phone && touched.phone && errors.phone}
                    </Text>
                  </Box>

                  <Box>
                    <FormLabel fontSize={{ base: '16px' }}>Data de Nascimento</FormLabel>
                    <Input type="date" id="birthdate" onChange={handleChange} />
                    <Text fontSize={{ base: '12px' }} color="red">
                      {errors.birthdate && touched.birthdate && errors.birthdate}
                    </Text>
                  </Box>

                  <Box>
                    <FormLabel fontSize={{ base: '16px' }}>Senha</FormLabel>
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
                    <FormLabel fontSize={{ base: '16px' }}>Confirme sua senha</FormLabel>
                    <InputGroup>
                      <Input
                        id="passwordConfirmation"
                        onChange={handleChange}
                        type={show ? 'text' : 'passwordConfirmation'}
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
                  <Button
                    colorScheme="blackAlpha"
                    type="submit"
                    bg="blackAlpha.900"
                    variant="solid"
                  >
                    {isSubmitting ? <Spinner /> : 'Continuar'}
                  </Button>
                  <Link
                    color="blue.500"
                    fontSize={{ base: '12px', md: '14px' }}
                    onClick={handleGoBackToLogin}
                  >
                    Já tem cadastro? Faça seu login!
                  </Link>
                </Stack>
              </form>
            )}
          </Formik>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default SignUpForm;
