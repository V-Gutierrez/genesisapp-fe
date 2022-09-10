import {
  Stack,
  FormLabel,
  Input,
  HStack,
  InputGroup,
  InputLeftAddon,
  Select,
  InputRightElement,
  Button,
  Spinner,
  Text,
  Box,
  useToast,
} from '@chakra-ui/react'
import { useUser } from 'context/UserContext'
import { isAfter } from 'date-fns'
import { Formik, FormikHelpers } from 'formik'
import { SUBSCRIPTION_INITIAL_VALUES } from 'helpers/formInitialValues'
import { formatToTimezone } from 'helpers/time'

import { EVENT_SUBSCRIPTION_SCHEMA } from 'helpers/validationSchemas'
import React, { useMemo } from 'react'
import { useMutation } from 'react-query'
import Flag from 'react-world-flags'
import InputMask from 'react-input-mask'
import { SUBSCRIBE_TO_EVENT } from 'services/mutations'

export function SubscriptionForm({
  eventId,
  maxSlots,
  _count,
  eventDate,
  subscriptionsDueDate,
  refetch,
}: SubscriptionFormProps) {
  const toast = useToast()
  const { userData } = useUser()
  const { mutateAsync: subscribe } = useMutation(SUBSCRIBE_TO_EVENT)

  const handleSubscription = async (
    values: EventSubscriptionFormValues,
    { setSubmitting }: FormikHelpers<EventSubscriptionFormValues>,
  ) => {
    setSubmitting(true)
    try {
      await subscribe({ id: eventId, values })
      toast({
        title: 'Inscrição foi concluída com succeso',
        status: 'success',
      })
      refetch()
    } catch (e) {
      toast({
        title: 'Erro',
        status: 'error',
        description: 'Houve um erro ao efetuar sua inscrição. Contate o suporte.',
      })
    }
    setSubmitting(false)
  }

  const INITIAL_VALUES = userData
    ? {
        userName: userData.name,
        userEmail: userData.email,
        userPhone: userData.phone,
        region: '+54',
      }
    : SUBSCRIPTION_INITIAL_VALUES

  const subscriptionIsDue =
    isAfter(new Date(), new Date(eventDate)) || isAfter(new Date(), new Date(subscriptionsDueDate))
  const formattedEventDate = useMemo(
    () => formatToTimezone(eventDate, "dd 'de' MMMM 'de' yyyy 'às' HH:MM"),
    [eventDate],
  )
  const subscriptionsEndDate = useMemo(
    () => formatToTimezone(subscriptionsDueDate, "dd 'de' MMMM 'de' yyyy 'às' H'h'"),
    [subscriptionsDueDate],
  )
  const remainingSlots = useMemo(() => maxSlots - _count.EventsSubscriptions, [maxSlots, _count])
  const isSubscriptionAvailable = remainingSlots > 0

  return (
    <>
      <Stack spacing={2}>
        <Text align="center">Vagas disponíveis: {maxSlots - _count.EventsSubscriptions}</Text>
        <Text align="center">{formattedEventDate}</Text>
        <Text align="center">Inscrições abertas até {subscriptionsEndDate}</Text>
      </Stack>
      {maxSlots - _count.EventsSubscriptions > 0 ? (
        <Formik
          initialValues={INITIAL_VALUES as EventSubscriptionFormValues}
          onSubmit={handleSubscription}
          validationSchema={EVENT_SUBSCRIPTION_SCHEMA}
        >
          {({ errors, touched, handleSubmit, handleChange, isSubmitting, values }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <Box>
                  <FormLabel fontSize={{ base: '16px' }}>Nome e Sobrenome</FormLabel>
                  <Input type="name" id="userName" onChange={handleChange} />
                  <Text fontSize={{ base: '12px' }} color="red">
                    {errors.userName && touched.userName && errors.userName}
                  </Text>
                </Box>

                <Box>
                  <FormLabel>
                    <HStack cursor="pointer">
                      <Text fontSize={{ base: '16px' }}>Email</Text>
                    </HStack>
                  </FormLabel>
                  <Input type="email" id="userEmail" onChange={handleChange} />
                  <Text fontSize={{ base: '12px' }} color="red">
                    {errors.userEmail && touched.userEmail && errors.userEmail}
                  </Text>
                </Box>

                <Box>
                  <FormLabel d="flex">
                    <HStack>
                      <Text fontSize={{ base: '16px' }}>Telefone</Text>
                    </HStack>
                  </FormLabel>

                  <InputGroup>
                    <InputLeftAddon
                      padding="0"
                      bg="none"
                      border="none"
                      children={
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
                      }
                    />

                    <Input
                      type="tel"
                      id="userPhone"
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
                      children={
                        <Box w={{ base: '20px' }}>
                          <Flag code={values.region === '+55' ? 'bra' : 'arg'} height="10" />
                        </Box>
                      }
                    />
                  </InputGroup>
                  <Text fontSize={{ base: '12px' }} color="red">
                    {errors.userPhone && touched.userPhone && errors.userPhone}
                  </Text>
                </Box>
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
                    disabled={isSubmitting || subscriptionIsDue || !isSubscriptionAvailable}
                  >
                    {isSubmitting ? (
                      <Spinner />
                    ) : subscriptionIsDue ? (
                      'Inscrições encerradas'
                    ) : (
                      'Efetuar inscrição'
                    )}
                  </Button>
                </Stack>
              </Stack>
            </form>
          )}
        </Formik>
      ) : (
        <Text align="center" fontWeight="black" pb={10}>
          Inscrições encerradas
        </Text>
      )}
    </>
  )
}
