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

import { CREATE_DEVOTIONAL } from 'services/mutations'
import { DEVOTIONAL_CREATION_INITIAL_VALUES } from 'helpers/formInitialValues'
import { DEVOTIONAL_CREATION_SCHEMA } from 'helpers/validationSchemas'
import { GET_ADMIN_DEVOTIONALS } from 'services/queries'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const DevotionalEditor: React.FC<EditorProps> = ({ onClose }) => {
  const toast = useToast()
  const [toolbar, setToolbar] = useState<any>(false)
  const { mutateAsync: createDevotional } = useMutation(CREATE_DEVOTIONAL)
  const { refetch } = useQuery('admin-devotionals', GET_ADMIN_DEVOTIONALS)

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldSetter: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  ) => {
    const { files } = e.target
    const { 0: file } = files as FileList

    fieldSetter('coverImage', file)
  }

  const onSubmit = async (
    values: DevotionalFormValues,
    FormikHelpersObject: FormikHelpers<DevotionalFormValues>,
  ) => {
    FormikHelpersObject.setSubmitting(true)
    try {
      await createDevotional(values)

      toast({
        title: 'Devocional criado com sucesso',
        status: 'success',
      })

      await refetch()
      onClose()
    } catch (e) {
      toast({
        title: 'Houve um erro ao criar o devocional',
        status: 'error',
      })
    }
    FormikHelpersObject.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={DEVOTIONAL_CREATION_INITIAL_VALUES}
      validationSchema={DEVOTIONAL_CREATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleSubmit, handleChange, isSubmitting, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={6} p={{ base: 2 }} mb={{ base: 10 }}>
            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Título do Devocional</FormLabel>
              <Input type="text" id="title" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.title && touched.title && errors.title}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Data e Hora de Lançamento</FormLabel>
              <Input type="datetime-local" id="scheduledTo" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.scheduledTo && touched.scheduledTo && errors.scheduledTo}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Autor</FormLabel>
              <Input type="text" id="author" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.author && touched.author && errors.author}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Capa do Devocional</FormLabel>
              <Input
                type="file"
                id="coverImage"
                accept="image/png, image/jpeg"
                textAlign="center"
                d="flex"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleFileChange(e, setFieldValue)
                }}
              />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.coverImage && touched.body && errors.coverImage}
              </Text>
            </Box>

            <Box onClick={() => setToolbar(RQ_TOOLBAR_OPTIONS)}>
              <Stack>
                <HStack>
                  <FormLabel fontSize={{ base: '16px' }}>Texto do Devocional</FormLabel>
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
                    '#devotionalBodyEditor .ql-toolbar.ql-snow': {
                      position: 'sticky',
                      top: 0,
                      background: 'white',
                      zIndex: '10',
                    },
                  }}
                >
                  <ReactQuill
                    id="devotionalBodyEditor"
                    theme="snow"
                    onChange={(value: string) => {
                      setFieldValue('body', value)
                    }}
                    formats={RQ_FORMAT_OPTIONS}
                    modules={{
                      toolbar,
                    }}
                  />
                  <Text fontSize={{ base: '12px' }} color="red">
                    {errors.body && touched.body && errors.body}
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

export default DevotionalEditor
