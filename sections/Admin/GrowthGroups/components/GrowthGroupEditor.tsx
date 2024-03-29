import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Spinner,
  Stack,
  useToast,
  Text,
  Select,
  Tooltip,
} from '@chakra-ui/react'
import { Autocomplete, GoogleMap, useLoadScript } from '@react-google-maps/api'
import { Formik, FormikHelpers } from 'formik'
import { WEEKDAYS, WORKING_HOURS } from 'helpers/constants'
import { GROWTH_GROUP_INITIAL_VALUES } from 'helpers/formInitialValues'
import { GROWTH_GROUP_CREATION_SCHEMA } from 'helpers/validationSchemas'
import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useMutation, useQuery } from 'react-query'
import { CREATE_GROWTH_GROUP } from 'services/mutations'
import { GET_GROWTH_GROUPS } from 'services/queries'

const GMAPS_LIBRARIES = ['places']
export default function GrowthGroupEditor({ onClose }: EditorProps) {
  const toast = useToast()
  const { mutateAsync: createGrowthGroups } = useMutation(CREATE_GROWTH_GROUP)
  const { refetch } = useQuery('admin-growthgroups', GET_GROWTH_GROUPS)

  const { isLoaded: mapIsLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    language: 'pt-BR',
    libraries: GMAPS_LIBRARIES as any,
  })

  const onSubmit = async (
    values: GrowthGroupFormValues,
    FormikHelpersObject: FormikHelpers<GrowthGroupFormValues>,
  ) => {
    FormikHelpersObject.setSubmitting(true)
    const parsedLeadershipNames = (values.leadership as string)
      .split(',')
      .map((name) => name)

    try {
      await createGrowthGroups({ ...values, leadership: parsedLeadershipNames })

      toast({
        title: 'GC criado com sucesso',
        status: 'success',
      })

      await refetch()
      onClose()
    } catch (e) {
      toast({
        title: 'Houve um erro ao inserir o grupo de crescimento',
        status: 'error',
      })
    }
    FormikHelpersObject.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={GROWTH_GROUP_INITIAL_VALUES}
      validationSchema={GROWTH_GROUP_CREATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleSubmit, handleChange, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={6} p={{ base: 2 }} mb={{ base: 10 }}>
            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Nome do GC</FormLabel>
              <Input type="text" id="name" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.name && touched.name && errors.name}
              </Text>
            </Box>

            <Box>
              <Flex align="center">
                <FormLabel fontSize={{ base: '16px' }}>
                  Endereço do GC
                </FormLabel>
                <Tooltip
                  shouldWrapChildren
                  hasArrow
                  cursor="pointer"
                  label="Insira o endereço corretamente para que o mapa seja exibido corretamente. As coordenadas são detectadas a partir do endereço registrado"
                  placement="top"
                >
                  <Box mb={2}>
                    <AiOutlineInfoCircle />
                  </Box>
                </Tooltip>
              </Flex>
            </Box>

            {mapIsLoaded && (
              <Box
                zIndex="popover"
                __css={{
                  '.autocomplete-input': {
                    background: '#fff',
                  },
                }}
              >
                <GoogleMap zoom={2.5}>
                  <Autocomplete
                    options={{
                      types: ['address'],
                      componentRestrictions: { country: ['br', 'ar'] },
                    }}
                    className="autocomplete-input"
                  >
                    <Input
                      type="text"
                      id="addressInfo"
                      onChange={handleChange}
                      placeholder="Exemplo: Av. Cabildo 1452, 6A"
                    />
                  </Autocomplete>
                </GoogleMap>
              </Box>
            )}

            <Text fontSize={{ base: '12px' }} color="red">
              {errors.addressInfo && touched.addressInfo && errors.addressInfo}
            </Text>

            <Box>
              <Flex align="center">
                <FormLabel fontSize={{ base: '16px' }}>
                  Nome dos líderes do GC
                </FormLabel>
                <Tooltip
                  shouldWrapChildren
                  hasArrow
                  cursor="pointer"
                  label="Insira o nome dos líderes separados por vírgula"
                  placement="top"
                >
                  <Box mb={2}>
                    <AiOutlineInfoCircle />
                  </Box>
                </Tooltip>
              </Flex>
              <Input
                type="text"
                id="leadership"
                onChange={handleChange}
                placeholder="Exemplo: Fernanda, Gustavo"
              />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.leadership && touched.leadership && errors.leadership}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>
                Link do grupo no WhatsApp
              </FormLabel>
              <Input type="text" id="whatsappLink" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.whatsappLink &&
                  touched.whatsappLink &&
                  errors.whatsappLink}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Dia da semana</FormLabel>

              <Select id="weekDay" onChange={handleChange}>
                {WEEKDAYS.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </Select>

              <Text fontSize={{ base: '12px' }} color="red">
                {errors.weekDay && touched.weekDay && errors.weekDay}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Horário</FormLabel>

              <Select id="scheduledTime" onChange={handleChange}>
                {WORKING_HOURS.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </Select>

              <Text fontSize={{ base: '12px' }} color="red">
                {errors.scheduledTime &&
                  touched.scheduledTime &&
                  errors.scheduledTime}
              </Text>
            </Box>
          </Stack>
          <Flex w="100%" justifyContent="center" mt={{ base: 2 }}>
            <Button
              colorScheme="blackAlpha"
              type="submit"
              bg="blackAlpha.900"
              minW="200px"
              variant="solid"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : 'Criar'}
            </Button>
          </Flex>
        </form>
      )}
    </Formik>
  )
}
