import 'react-quill/dist/quill.snow.css'

import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Formik, FormikHelpers } from 'formik'
import { RQ_FORMAT_OPTIONS, RQ_TOOLBAR_OPTIONS } from 'helpers/reactQuill'
import { useMutation, useQuery } from 'react-query'

import { CREATE_EVENT } from 'services/mutations'
import { EVENT_CREATION_INITIAL_VALUES } from 'helpers/formInitialValues'
import { EVENT_CREATION_SCHEMA } from 'helpers/validationSchemas'
import { GET_ADMIN_EVENTS } from 'services/queries'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { isBefore } from 'date-fns'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const EventEditor: React.FC<EditorProps> = ({ onClose }) => {
  const toast = useToast()
  const [toolbar, setToolbar] = useState<any>(false)
  const { mutateAsync: createEvent } = useMutation(CREATE_EVENT)
  const { refetch } = useQuery('admin-events', GET_ADMIN_EVENTS)

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldSetter: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  ) => {
    const { files } = e.target
    const { 0: file } = files as FileList

    fieldSetter('coverImage', file)
  }

  const onSubmit = async (
    values: EventItemFormValues,
    FormikHelpersObject: FormikHelpers<EventItemFormValues>,
  ) => {
    FormikHelpersObject.setSubmitting(true)

    if (
      isBefore(new Date(values.subscriptionsDueDate), new Date(values.subscriptionsScheduledTo))
    ) {
      FormikHelpersObject.setFieldError(
        'subscriptionsDueDate',
        'A data de encerramento das inscrições deve ser posterior à data de ínicio das inscrições',
      )
      return
    }

    if (isBefore(new Date(values.eventDate), new Date(values.subscriptionsScheduledTo))) {
      FormikHelpersObject.setFieldError(
        'eventDate',
        'A data das inscrições não pode ser posterior à data do evento.',
      )
      return
    }
    if (isBefore(new Date(values.eventDate), new Date(values.subscriptionsDueDate))) {
      FormikHelpersObject.setFieldError(
        'eventDate',
        'A data de encerramento das inscrições não pode ser posterior à data do evento.',
      )
      return
    }

    try {
      await createEvent(values)

      toast({
        title: 'Evento criado com sucesso',
        status: 'success',
      })

      await refetch()
      onClose()
    } catch (e) {
      toast({
        title: 'Houve um erro ao criar o evento',
        status: 'error',
      })
    }
    FormikHelpersObject.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={EVENT_CREATION_INITIAL_VALUES}
      validationSchema={EVENT_CREATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleSubmit, handleChange, isSubmitting, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={6} p={{ base: 2 }} mb={{ base: 10 }}>
            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Título do Evento</FormLabel>
              <Input type="text" id="title" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.title && touched.title && errors.title}
              </Text>
            </Box>
            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Vagas Disponíveis</FormLabel>
              <Input type="number" min={1} id="maxSlots" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.maxSlots && touched.maxSlots && errors.maxSlots}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>
                Data e Hora de Lançamento das inscrições
              </FormLabel>
              <Input type="datetime-local" id="subscriptionsScheduledTo" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.subscriptionsScheduledTo &&
                  touched.subscriptionsScheduledTo &&
                  errors.subscriptionsScheduledTo}
              </Text>
            </Box>
            <Box>
              <FormLabel fontSize={{ base: '16px' }}>
                Data e Hora de Encerramento das inscrições
              </FormLabel>
              <Input type="datetime-local" id="subscriptionsDueDate" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.subscriptionsDueDate &&
                  touched.subscriptionsDueDate &&
                  errors.subscriptionsDueDate}
              </Text>
            </Box>
            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Data e Hora do Evento</FormLabel>
              <Input type="datetime-local" id="eventDate" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.eventDate && touched.eventDate && errors.eventDate}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Imagem do Evento</FormLabel>
              <Input
                type="file"
                id="coverImage"
                accept="image/png, image/jpeg, image/webp"
                textAlign="center"
                d="flex"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleFileChange(e, setFieldValue)
                }}
              />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.coverImage && touched.description && errors.coverImage}
              </Text>
            </Box>

            <Box onClick={() => setToolbar(RQ_TOOLBAR_OPTIONS)}>
              <Stack>
                <HStack>
                  <FormLabel fontSize={{ base: '16px' }}>Texto do Evento</FormLabel>
                </HStack>
                <Box
                  h={{ base: '250px' }}
                  overflowY="scroll"
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '5px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'transparent',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '10px',
                    },
                    '#eventEditor .ql-toolbar.ql-snow': {
                      position: 'sticky',
                      top: 0,
                      background: 'white',
                      zIndex: '10',
                    },
                  }}
                >
                  <ReactQuill
                    id="eventEditor"
                    theme="snow"
                    onChange={(value: string) => {
                      setFieldValue('description', value)
                    }}
                    formats={RQ_FORMAT_OPTIONS}
                    modules={{
                      toolbar,
                    }}
                  />
                  <Text fontSize={{ base: '12px' }} color="red">
                    {errors.description && touched.description && errors.description}
                  </Text>
                </Box>
              </Stack>
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

export default EventEditor
