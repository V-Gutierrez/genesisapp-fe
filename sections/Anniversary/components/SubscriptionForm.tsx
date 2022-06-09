import * as Yup from 'yup'

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
  Select,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'

import Axios from 'services/axios'
import Flag from 'react-world-flags'
import InputMask from 'react-input-mask'
import Success from 'components/Success'

const SUBSCRIPTION_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Insira um email válido').required('Insira um email'),
  name: Yup.string()
    .matches(/^[^\s]+( [^\s]+)+$/, 'Insira seu nome e sobrenome')
    .required('Insira seu nome e sobrenome'),
  phone: Yup.string()
    .matches(/^\+[0-9]{2}\s[0-9]{1,2}\s[0-9]{1,2}\s[0-9]{4}\-[0-9]{4}/, 'Insira um formato válido')
    .required('Insira seu telefone'),
})

const SubscriptionForm: React.FC<{ id: string }> = ({ id }) => {
  const toast = useToast()
  const [success, setSuccess] = useState(false)

  const onSubmit = async (
    values: Pick<SignUpFormValues, 'name' | 'email' | 'phone' | 'region'>,
    { setSubmitting }: FormikHelpers<Pick<SignUpFormValues, 'name' | 'email' | 'phone' | 'region'>>,
  ) => {
    setSubmitting(true)

    try {
      await Axios.post(`/externalevents/${id}`, {
        name: values.name,
        email: values.email,
        phone: values.phone,
      })
      setSuccess(true)
      toast({
        title: 'Inscrição realizada com sucesso!',
        status: 'success',
      })
    } catch (e) {
      toast({
        title:
          'Houve um erro na sua inscrição. Verifique se você já se inscreveu, caso não esteja inscrito, entre em contato com o administrador do evento.',
        status: 'error',
      })
    }
    setSubmitting(false)
  }

  if (success) {
 return (
      <Flex bg="whiteAlpha.600" w="full" justify="center" align="center">
        <Success
          title="Parabéns! Sua inscrição foi registrada!"
          subtitle="Você receberá um email de confirmação."
        />
      </Flex>
    )
}
  return (
    <Flex
      py={6}
      flex={1}
      align="center"
      w="100%"
      my={4}
      justify="center"
      scrollSnapAlign="center"
    >
      <Stack spacing={4} w="full" maxW="md">
        <Formik
          initialValues={{
 name: '', email: '', phone: '', region: '',
}}
          onSubmit={onSubmit}
          validationSchema={SUBSCRIPTION_SCHEMA}
        >
          {({
 errors, touched, handleSubmit, handleChange, values, isSubmitting,
}) => (
            <form onSubmit={handleSubmit}>
              <Stack>
                <Box>
                  <FormLabel fontWeight="bold" color="blackAlpha.900" fontSize={{ base: '12px' }}>
                    Nome e Sobrenome
                  </FormLabel>
                  <Input
                    bg="blackAlpha.900"
                    color="white"
                    type="name"
                    id="name"
                    onChange={handleChange}
                  />
                  <Text fontSize={{ base: '12px' }} color="red">
                    {errors.name && touched.name && errors.name}
                  </Text>
                </Box>

                <Box>
                  <FormLabel fontWeight="bold" color="blackAlpha.900">
                    <HStack cursor="pointer">
                      <Text fontSize={{ base: '12px' }}>Email</Text>
                    </HStack>
                  </FormLabel>
                  <Input
                    bg="blackAlpha.900"
                    color="white"
                    type="email"
                    id="email"
                    onChange={handleChange}
                  />
                  <Text fontSize={{ base: '12px' }} color="red">
                    {errors.email && touched.email && errors.email}
                  </Text>
                </Box>

                <Box>
                  <FormLabel fontWeight="bold" color="blackAlpha.900" d="flex">
                    <HStack>
                      <Text fontSize={{ base: '12px' }}>Telefone</Text>
                    </HStack>
                  </FormLabel>

                  <InputGroup>
                    <InputLeftAddon
                      padding="0"
                      bg="blackAlpha.900"
                      border="none"
                      children={(
                        <Box d="flex" alignItems="center" justifyContent="space-evenly">
                          <Select
                            id="region"
                            w={{ base: '80px' }}
                            color="gray.500"
                            onChange={handleChange}
                            fontSize={{ base: '12px' }}
                            bg="blackAlpha.900"
                          >
                            <option value="+54">ARG</option>
                            <option value="+55">BRA</option>
                          </Select>
                        </Box>
                      )}
                    />

                    <Input
                      bg="blackAlpha.900"
                      color="white"
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

                  <Box w="100%" d="flex" justifyContent="center" mt={{ base: 4 }}>
                    <Button
                      colorScheme="blackAlpha"
                      type="submit"
                      bg="#FF5835"
                      variant="solid"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Spinner /> : 'Inscrever-se'}
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </form>
          )}
        </Formik>
      </Stack>
    </Flex>
  )
}

export default SubscriptionForm
