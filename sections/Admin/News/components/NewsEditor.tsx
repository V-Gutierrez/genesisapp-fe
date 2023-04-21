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

import { CREATE_NEWS } from 'services/mutations'
import { GET_ADMIN_NEWS } from 'services/queries'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { NEWS_CREATION_INITIAL_VALUES } from 'helpers/formInitialValues'
import { NEWS_CREATION_SCHEMA } from 'helpers/validationSchemas'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const NewsEditor: React.FC<EditorProps> = ({ onClose }) => {
  const toast = useToast()
  const [toolbar, setToolbar] = useState<any>(false)
  const { mutateAsync: createNews } = useMutation(CREATE_NEWS)
  const { refetch } = useQuery('admin-news', GET_ADMIN_NEWS)

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldSetter: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  ) => {
    const { files } = e.target
    const { 0: file } = files as FileList

    fieldSetter('coverImage', file)
  }

  const onSubmit = async (
    values: NewsFormValues,
    FormikHelpersObject: FormikHelpers<NewsFormValues>,
  ) => {
    FormikHelpersObject.setSubmitting(true)
    try {
      await createNews(values)

      toast({
        title: 'Notícia criada com sucesso',
        status: 'success',
      })

      await refetch()
      onClose()
    } catch (e) {
      toast({
        title: 'Houve um erro ao criar a notícia',
        status: 'error',
      })
    }
    FormikHelpersObject.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={NEWS_CREATION_INITIAL_VALUES}
      validationSchema={NEWS_CREATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleSubmit, handleChange, isSubmitting, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={6} p={{ base: 2 }} mb={{ base: 10 }}>
            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Título da notícia</FormLabel>
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
              <FormLabel fontSize={{ base: '16px' }}>Texto de destaque</FormLabel>
              <Input type="text" id="highlightText" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.highlightText && touched.highlightText && errors.highlightText}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Capa da Notícia</FormLabel>
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
                  <FormLabel fontSize={{ base: '16px' }}>Texto da Notícia</FormLabel>
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
                    '#newsEditorBody .ql-toolbar.ql-snow': {
                      position: 'sticky',
                      top: 0,
                      background: 'white',
                      zIndex: '10',
                    },
                  }}
                >
                  <ReactQuill
                    id="newsEditorBody"
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

export default NewsEditor
